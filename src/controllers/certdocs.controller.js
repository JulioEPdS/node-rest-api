import { getConnection, sql, MAX } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'
import { unlink } from 'fs'
import path from 'path'
//import slash from 'slash'

//import multer from 'multer'


//SELECT * CONSTANCIAS GET ALL/ONE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCert = async (req, res) => {
    const id  = req.params
    let specific = 'NO'
    if(id.length>1){
        specific = 'YES'
    }
    
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

//PROCESO INSERT PARA CONSTANCIAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createCert = async (req, res) => {
    const id = uuidv4()
    const { type, name, description, config, user_id } = req.body
    const base_route = req.file.path
    if (id && type && name && description && config && base_route && user_id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('type', sql.VarChar(20), type)
                .input('name', sql.VarChar(50), name)
                .input('description', sql.VarChar(255), description)
                .input('base_route', sql.VarChar(255), base_route)
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
        }

        catch (err) {
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

    else {
        unlink(base_route, (err) => {
            if (err) throw err;
            console.log('se canceló guardado de archivo debido a un conflicto/error')
        })
        return res.status(400).json({
            message: "No se proporcionó información completa"
        })
    }
}

///UPDATE PARA CONSTANCIAS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateCert = async (req, res) => {
    const { id, type, name, description, config, user_id } = req.body
    if ( id && type && name && description && config && user_id ) {
        //try {            
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('type', sql.VarChar(20), type)
                .input('name', sql.VarChar(50), name)
                .input('description', sql.VarChar(255), description)
                .input('config', sql.NVarChar(MAX), config)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('updateCertdoc')
                .then(result => {
                    if (result.returnValue == 200) {
                        return res.status(result.returnValue).json({
                            message: 'Se ha actualizado la constancia'
                        })
                    }

                    return res.status(result.returnValue).json({
                        message: 'Actualización de constancia fallida'
                    })
                })
        //}

        /*catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al ejecutar la actualización de constancia'
            })
        }*/
    }

    else {        
        return res.status(400).json({
            message: "No se proporcionó información completa"
        })
    }
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCert = async (req, res) => {
}
