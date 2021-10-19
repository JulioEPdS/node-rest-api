import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken'

export const queryEventos = async(req,res) =>{
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .execute('API_geteventos')
        .then(result => {
            if(result.returnValue != 200){
                return res.status( result.returnValue ).json({                    
                    message: 'Error al consultar'}) 
            }
            return res.status( result.returnValue ).json(
                result.recordset
            )
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar'
        })

    }
}

export const queryLogin = async(req,res) => {
    try{
        const {email, password} = req.body
        if(email && password){
            const pool = await getConnection()
            await pool
            .request()
            .input('email',sql.VarChar(50),email)
            .input('password',sql.VarChar(50),password)
            .execute('API_login')
            .then(result =>{
                if(result.returnValue == 200){
                    
                    //GENERATE TOKEN USING JWT
                    const token = jwt.sign({
                        email: email,
                    },config.jwt_APIKey,{
                    expiresIn: "1h"
                    })//JWT SIGN

                    res.status(result.returnValue).json({
                        message: 'Credenciales verificadas',
                        token: token                        
                    })
                }
                return res.status(401).json({
                    msg:"no autorizado"
                })
            })
        }
        else{
            return res.status(400).json({
                msg:"No se proporcionó información completa"
            })
        }
    }
    catch(err){
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            error: {
                message: 'error interno'
            }
        })
    }
}

export const querySignup = async(req,res) => {
    //PARA PARTICIPANTES CONTROLADOS
    const {
        email,
        password,
        nombre,
        paterno,
        materno,
        direccion,
        estado,
        municipio,
        phone,
        gender,
        discapacidad,
        eres,
        empresa,
        producto_servicio,
        birthdate,
        rfc,
        curp,        
        compartir
    } = req.body
    const id = uuidv4()
    try{
        const pool = await getConnection()
        await pool
        .request()
        .input('id',sql.VarChar(255),id)
        .input('email',sql.VarChar(50),email)
        .input('password',sql.VarChar(255),password)
        .input('nombre',sql.VarChar(50),nombre)
        .input('paterno',sql.VarChar(55),paterno)
        .input('materno',sql.VarChar(50),materno)
        .input('direccion',sql.VarChar(90),direccion)
        .input('estado',sql.VarChar(50),estado)
        .input('municipio',sql.VarChar(50),municipio)
        .input('phone',sql.VarChar(20),phone)
        .input('gender',sql.VarChar(20),gender)      
        .input('discapacidad',sql.Bit,discapacidad)
        .input('eres',sql.VarChar(50),eres)
        .input('empresa',sql.VarChar(255),empresa)
        .input('producto_servicio',sql.VarChar(100),producto_servicio)  
        .input('birthdate',sql.DateTime,birthdate)        
        .input('rfc',sql.VarChar(15),rfc)
        .input('curp',sql.VarChar(25),curp)        
        .input('compartir',sql.Bit,compartir)
        .execute('API_signup')
        .then(result => {
            if(result.returnValue == 409){
                return res.status(result.returnValue).json({
                    message: 'el correo especificado ya se encuentra en uso'
                })                
            }            
            else if(result.returnValue == 500){
                return res.status( result.returnValue ).json({                    
                    message: 'hubo un error con la base de datos'}) 
            }
            return res.status( result.returnValue ).json({
                message: 'registrado con éxito'
            })            
        })
    }catch(error) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            error: {
                message: 'error interno'
            }
        })

    }
}

export const queryRegistro = async(req,res)=>{ 
    //PARA PARTICIPANTES NO CONTROLADOS
    const {
        email,        
        nombre,
        paterno,
        materno,
        direccion,
        estado,
        municipio,
        phone,
        gender,
        discapacidad,
        eres,
        empresa,
        producto_servicio,
        birthdate,
        rfc,
        curp,        
        compartir
    } = req.body
    const id = uuidv4()
    try{
        const pool = await getConnection()
        await pool
        .request()
        .input('id',sql.VarChar(255),id)
        .input('email',sql.VarChar(50),email)
        .input('nombre',sql.VarChar(50),nombre)
        .input('paterno',sql.VarChar(55),paterno)
        .input('materno',sql.VarChar(50),materno)
        .input('direccion',sql.VarChar(90),direccion)
        .input('estado',sql.VarChar(50),estado)
        .input('municipio',sql.VarChar(50),municipio)
        .input('phone',sql.VarChar(20),phone)
        .input('gender',sql.VarChar(20),gender)      
        .input('discapacidad',sql.Bit,discapacidad)
        .input('eres',sql.VarChar(50),eres)
        .input('empresa',sql.VarChar(255),empresa)
        .input('producto_servicio',sql.VarChar(100),producto_servicio)  
        .input('birthdate',sql.DateTime,birthdate)        
        .input('rfc',sql.VarChar(15),rfc)
        .input('curp',sql.VarChar(25),curp)        
        .input('compartir',sql.Bit,compartir)
        .execute('API_registro')
        .then(result => {
            if(result.returnValue == 409){
                return res.status(result.returnValue).json({
                    message: 'el correo especificado ya se encuentra en uso'
                })                
            }            
            else if(result.returnValue == 500){
                return res.status( result.returnValue ).json({                    
                    message: 'hubo un error con la base de datos'}) 
            }
            return res.status( result.returnValue ).json({
                message: 'registrado con éxito'
            })            
        })
    }catch(error) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            error: {
                message: 'error interno'
            }
        })

    }
}

export const queryValid = async(req,res) =>{
    res.json({
        msg:'Aún estoy trabajando en esto'
    })
}

export const queryInscript = async(req,res) =>{
    const {
        participante, 
        email, 
        evento,
        respuesta
    } = req.body
    const id = uuidv4()
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .input("id",sql.VarChar(255) ,id)
        .input("participante",sql.VarChar(255) ,participante)
        .input("email",sql.VarChar(255) ,email)
        .input("evento",sql.VarChar(255) ,evento)
        .input("respuesta",sql.VarChar(100) ,respuesta)
        .execute('API_inscription')
        .then(result => {
            if(result.returnValue == 409){
                return res.status(result.returnValue).json({
                    message: 'usted ya se encuentra inscrito'
                })                
            }            
            else if(result.returnValue == 500){
                return res.status( result.returnValue ).json({                    
                    message: 'hubo un error con la base de datos'}) 
            }
            return res.status( result.returnValue ).json({
                message: 'inscrito con éxito'
            }) 
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message:'ha ocurrido un error al inscribir'
        })        
    }
}

export const editarDatosCorreo = async(req,res)=>{
    res.json({
        msg:'Desde aquí enviamos un correo con una liga para editar los datos de alguien sin una cuenta'
    })
}