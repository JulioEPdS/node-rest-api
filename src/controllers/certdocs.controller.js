import { getConnection, sql, MAX } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'
import { unlink } from 'fs'
import path from 'path'
//import slash from 'slash'

//import multer from 'multer'


//SELECT * CONSTANCIAS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCert = async (req, res) => {
    const { specific, id } = req.body
    if (specific && id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('specific', sql.VarChar(6), specific)
                .input('id', sql.VarChar(255), id)
                .execute('getCertdocs')
                .then(result => {
                    return res.status(200).json(
                        result.recordset
                    )
                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar las constancia(s)'
            })

        }
    }
    else {
        return res.status(400).json({
            msg: "No se proporcionó información completa"
        })
    }

}

//QUERY ESPECÍFICOS PARA CONSTANCIAS GET ONE//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getoneCert = async (req, res) => {
    try {
        //Código incompleto
        /*Código para enviar un archivo*/
        const ruta = "uploads/constancias/"
        var options = {
            root: path.join('./')
        }
        res.sendFile(ruta, options, function (err) {
            if (err) {
                console.log(err)
                return
            }
            else { console.log("Enviado", ruta) }
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la consulta de constancia'
        })
    }
}

//PROCESO INSERT PARA CONSTANCIAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createCert = async (req, res) => {
    const { type, name, description, config, user_id } = req.body
    const base_route = req.file.path
    try {
        if (type && name && description && base_route && user_id) {
            const id = uuidv4()
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('type', sql.VarChar(20), type)
                .input('name', sql.VarChar(50), name)
                .input('description', sql.VarChar(255), description)
                .input('base_route', sql.VarChar(100), base_route)
                .input('config', sql.NVarChar(MAX), config)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('createCertdoc')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Nuevo certificado creado'
                        })
                    }

                    unlink(base_route, (err) => {
                        if (err) throw err;
                        console.log('se canceló guardado de archivo debido a un conflicto/error')
                    })
                    return res.status(result.returnValue).json({
                        message: 'Creación de constancia fallida'
                    })
                })
        } else {
            unlink(base_route, (err) => {
                if (err) throw err;
                console.log('se canceló guardado de archivo debido a un conflicto/error')
            })
            return res.status(400).json({
                message: "No se proporcionó información completa"
            })
        }
    } catch (err) {
        console.log(err)
        console.log('Continuando ...')
        unlink(base_route, (err) => {
            if (err) throw err;
            console.log('se canceló guardado de archivo debido a un conflicto/error')
        })
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de constancia'
        })
    }
}

///UPDATE PARA CONSTANCIAS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateCert = async (req, res) => {
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCert = async (req, res) => {
}
