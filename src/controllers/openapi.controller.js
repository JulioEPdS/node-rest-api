import config from '../config' //Necesario para acceder a nuestra configuracion
import path from 'path'

import { getConnection, sql } from '../database/connection'
import { MAX } from 'mssql'
import { v4 as uuidv4 } from 'uuid' //Ayuda a generar UUIDs

import jwt from 'jsonwebtoken' //Ayuda a generar nuestros tokens
import nodemailer from 'nodemailer' //MAILER
import generator from 'generate-password'
import { mailSending } from '../app'

import fs from 'fs'



/*SELECT ALL AVAILABLE EVENTS */
export const queryEventos = async (req, res) => {
    const { specific, id } = req.body
    if (specific && id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('specific', sql.VarChar(5), specific)
                .input('id', sql.VarChar(255), id)
                .execute('API_geteventos')
                .then(result => {
                    if (result.returnValue != 200) {
                        return res.status(result.returnValue).json({
                            message: 'Error al consultar'
                        })
                    }
                    return res.status(result.returnValue).json(
                        result.recordset
                    )
                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar'
            })
        }
    }
    else {
        return res.status(400).json({
            message: 'No se proporcionó información completa'
        })
    }
}//READY

export const sendBanner = async (req, res) => {
    const { id } = req.body
    let ruta = ''
    if (id) {
        try {

            //GET THE ROUTE SAVED ON DATABASE
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .execute('API_geteventBanner')
                .then(result => {
                    if (result.returnValue != 200) {
                        //STOPS ALL WHEN WE DON'T FIND 
                        return res.status(500).json({
                            message: 'Error al consultar'
                        })
                    }
                    //IF WE GOT 200 (OK) SET RUTA
                    ruta = result.recordset[0].banner
                })
        }
        catch {
            return res.status(result.returnValue).json({
                message: 'Error al consultar'
            })
        }

        var options = {
            root: path.join('./')
        }

        return res.sendFile(ruta, options, function (err) {
            if (err) {
                console.log(err)
                return
            }
            else { console.log("Enviado", ruta) }
        })

        //console.log(ruta)
        //return res.status(200).json({msg:'checa'})

    }
    else {
        return res.status(400).json({
            message: 'No se proporcionó información completa'
        })
    }
}//READY

export const queryLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const pool = await getConnection()
            await pool
                .request()
                .input('email', sql.VarChar(50), email)
                .input('password', sql.VarChar(50), password)
                .execute('API_login')
                .then(result => {
                    if (result.returnValue == 200) {

                        //GENERATE TOKEN USING JWT
                        const token = jwt.sign({
                            email: email,
                        }, config.jwt_APIKey, {
                            expiresIn: "1h"
                        })//JWT SIGN

                        res.status(result.returnValue).json({
                            message: 'Credenciales verificadas',
                            token: token
                        })
                    }
                    return res.status(401).json({
                        msg: "no autorizado"
                    })
                })
        }
        else {
            return res.status(400).json({
                msg: "No se proporcionó información completa"
            })
        }
    }
    catch (err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            error: {
                message: 'error interno'
            }
        })
    }
}

export const querySignup = async (req, res) => {
    //PARA PARTICIPANTES CONTROLADOS
    const {
        email,
        password,
        nombre,
        apellido_p,
        apellido_m,
        address,
        estado,
        municipio,
        phone,
        sexo,
        discapacidad,
        clasificacion,
        empresa,
        giro_prod_serv,
        r_social,
        fechanac,
        rfc,
        curp,
        aditional_info,
        data_share,
        mail_subscription
    } = req.body
    const id = uuidv4()
    if (id &&
        email &&
        password &&
        nombre &&
        apellido_p &&
        apellido_m &&
        address &&
        estado &&
        municipio &&
        phone &&
        sexo &&
        discapacidad &&
        clasificacion &&
        empresa &&
        giro_prod_serv &&
        r_social &&
        fechanac &&
        rfc &&
        curp &&
        aditional_info &&
        data_share &&
        mail_subscription) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('email', sql.VarChar(50), email)
                .input('password', sql.VarChar(255), password)
                .input('nombre', sql.VarChar(50), nombre)
                .input('apellido_p', sql.VarChar(50), apellido_p)
                .input('apellido_m', sql.VarChar(50), apellido_m)
                .input('address', sql.VarChar(90), address)
                .input('estado', sql.VarChar(50), estado)
                .input('municipio', sql.VarChar(50), municipio)
                .input('phone', sql.VarChar(20), phone)
                .input('sexo', sql.VarChar(20), sexo)
                .input('discapacidad', sql.Bit, discapacidad)
                .input('clasificacion', sql.VarChar(50), clasificacion)
                .input('empresa', sql.VarChar(255), empresa)
                .input('giro_prod_serv', sql.VarChar(255), giro_prod_serv)
                .input('r_social', sql.VarChar(255), r_social)
                .input('fechanac', sql.Date, fechanac)
                .input('rfc', sql.VarChar(15), rfc)
                .input('curp', sql.VarChar(25), curp)
                .input('aditional_info', sql.NVarChar(MAX), aditional_info)
                .input('data_share', sql.Bit, data_share)
                .input('mail_subscription', sql.Bit, mail_subscription)
                .execute('API_signup')
                .then(result => {
                    if (result.returnValue == 409) {
                        return res.status(result.returnValue).json({
                            message: 'el correo especificado ya se encuentra en uso'
                        })
                    }
                    else if (result.returnValue == 500) {
                        return res.status(result.returnValue).json({
                            message: 'hubo un error con la base de datos'
                        })
                    }
                    return res.status(result.returnValue).json({
                        message: 'registrado con éxito'
                    })
                })
        } catch (error) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                error: {
                    message: 'error interno'
                }
            })

        }
    }
    else {
        return res.status(400).json({
            msg: "No se proporcionó información completa"
        })
    }
}

export const queryRegistro = async (req, res) => {
    //PARA PARTICIPANTES NO CONTROLADOS
    const {
        email,
        nombre,
        apellido_p,
        apellido_m,
        address,
        estado,
        municipio,
        phone,
        sexo,
        discapacidad,
        clasificacion,
        empresa,
        giro_prod_serv,
        r_social,
        fechanac,
        rfc,
        curp,
        aditional_info,
        data_share,
        mail_subscription
    } = req.body
    const id = uuidv4()
    if (id &&
        email &&
        nombre &&
        apellido_p &&
        apellido_m &&
        address &&
        estado &&
        municipio &&
        phone &&
        sexo &&
        discapacidad &&
        clasificacion &&
        empresa &&
        giro_prod_serv &&
        r_social &&
        fechanac &&
        rfc &&
        curp &&
        aditional_info &&
        data_share &&
        mail_subscription
    ) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('email', sql.VarChar(50), email)
                .input('nombre', sql.VarChar(50), nombre)
                .input('apellido_p', sql.VarChar(50), apellido_p)
                .input('apellido_m', sql.VarChar(50), apellido_m)
                .input('address', sql.VarChar(90), address)
                .input('estado', sql.VarChar(50), estado)
                .input('municipio', sql.VarChar(50), municipio)
                .input('phone', sql.VarChar(20), phone)
                .input('sexo', sql.VarChar(20), sexo)
                .input('discapacidad', sql.Bit, discapacidad)
                .input('clasificacion', sql.VarChar(50), clasificacion)
                .input('empresa', sql.VarChar(255), empresa)
                .input('giro_prod_serv', sql.VarChar(255), giro_prod_serv)
                .input('r_social', sql.VarChar(255), r_social)
                .input('fechanac', sql.Date, fechanac)
                .input('rfc', sql.VarChar(15), rfc)
                .input('curp', sql.VarChar(25), curp)
                .input('aditional_info', sql.NVarChar(MAX), aditional_info)
                .input('data_share', sql.Bit, data_share)
                .input('mail_subscription', sql.Bit, mail_subscription)
                .execute('API_registro')
                .then(result => {
                    if (result.returnValue == 409) {
                        return res.status(result.returnValue).json({
                            message: 'el correo especificado ya se encuentra en uso'
                        })
                    }
                    else if (result.returnValue == 500) {
                        return res.status(result.returnValue).json({
                            message: 'hubo un error con la base de datos'
                        })
                    }
                    return res.status(result.returnValue).json({
                        message: 'registrado con éxito'
                    })
                })
        } catch (error) {
            console.log(error)
            console.log('Continuando ...')
            return res.status(500).json({
                error: {
                    message: 'error interno'
                }
            })
        }
    }
    else {
        return res.status(400).json({
            msg: "No se proporcionó información completa"
        })
    }

}




export const queryValid = async (req, res) => {
    res.json({
        msg: 'Aún estoy trabajando en esto'
    })
}


export const queryInscript = async (req, res) => {
    const {
        participante,
        email,
        evento,
        respuesta
    } = req.body
    const id = uuidv4()
    if (participante && email && evento && respuesta && id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input("id", sql.VarChar(255), id)
                .input("participante", sql.VarChar(255), participante)
                .input("email", sql.VarChar(255), email)
                .input("evento", sql.VarChar(255), evento)
                .input("respuesta", sql.VarChar(100), respuesta)
                .execute('API_inscription')
                .then(result => {
                    if (result.returnValue == 409) {
                        return res.status(result.returnValue).json({
                            message: 'usted ya se encuentra inscrito'
                        })
                    }
                    else if (result.returnValue == 500) {
                        return res.status(result.returnValue).json({
                            message: 'hubo un error con la base de datos'
                        })
                    }
                    return res.status(result.returnValue).json({
                        message: 'inscrito con éxito'
                    })
                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al inscribir'
            })
        }
    }
    else {
        return res.status(400).json({
            msg: "No se proporcionó información completa"
        })
    }

}


export const editarDatosControlled = async (req, res) => {
    res.json({
        message: 'En construcción'
    })
}




export const reqUpgrade = async (req, res) => {
    //RECIBIR EMAIL req.body

    //CONSULTAR CORREO EN BD, 
    //ELIMINAR ACCESO TEMPORAL SI EXISTE--CREAR ACCESO TEMPORAL GUARDAR EN BD
    //ENVIAR DATOS DE ACCESO TEMPORAL POR CORREO

    const str = config.mails
    const correos = JSON.parse(str)
    let state = []


    const pass = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        excludeSimilarCharacters: true
    })//GENERATES A NEW PASSWORD

    fs.readFile('./state.txt', 'utf8', (err, data) => {
        if(err){
            console.log(err)
            return
        }
        state = JSON.parse(data)

    })
    console.log(state)

    return res.status(200).json({message:'check'})

    /*const { email } = req.body
    if(email && pass){
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: correos[2].email,
                pass: correos[2].pass
            }
        })
    
        var options = {
            from: correos[i].email,
            to: email,
            subject: "Solicitud de Upgrade Capacitaciones SEyT",
            text: "Por favor espera que el correo cargue...",
            html: "<p>Utiliza esta clave secreta para acceder: "+pass+" </p>"
        };
    
        //console.log(transportesList[i].t)
    
        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err)
                return
            }
    
            console.log('Sent: ', info.response)
        })
    
        return res.status(200).json({
            message: 'El proceso de invitación se está ejecutando en segundo plano'
        })

    }*/

    //const str = '[{"t":"transporter1"},{"t":"transporter2"},{"t":"transporter3"}]'
    //const transportesList = JSON.parse(str)







}

export const upgradeLogIn = async (req, res) => {
    //RECIBIR EMAIL Y CONTRASEÑA DE ACCESO TEMPORAL
    //ENVIAR TOKEN DE ACCESO A EDICIÓN DE DATOS Y SET CONTRASEÑA
}

export const Upgrade = async (req, res) => {
    //NECESITA TOKEN
    //RECIBE TODO EL DATA DE UN USUARIO, HACE UPDATE DE TODO...
    //SI TODO POSITIVO, UPGRADE CUENTA A CONTROLADO: 1 && CONTRASEÑA CAMBIADA
}



export const reqModify = async (req, res) => {
    //RECIBIR EMAIL req.body

    //CONSULTAR CORREO EN BD, 
    //CREAR ACCESO TEMPORAL GUARDAR EN BD
    //ENVIAR DATOS DE ACCESO TEMPORAL POR CORREO
}


export const modifyLogIn = async (req, res) => {
    //RECIBIR EMAIL Y CONTRASEÑA DE ACCESO TEMPORAL
    //ENVIAR TOKEN DE ACCESO PARA EDICIÓN DE DATOS
}


export const Modify = async (req, res) => {
    //NECESITA TOKEN
    //RECIBE TODO EL DATA DE UN USUARIO, HACE UPDATE DE TODO...
    //SI TODO POSITIVO, UPGRADE CUENTA A CONTROLADO: 1 && CONTRASEÑA CAMBIADA
}