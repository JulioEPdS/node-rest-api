import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'
import { MAX } from 'mssql'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getForm = async (req, res) => {
    const id  = req.params.id
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
                .execute('getFormularios')
                .then(result => {
                    return res.status(200).json(
                        result.recordset
                    )
                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar formularios'
            })

        }
    }
    else {
        return res.status(400).json({
            message: "No se proporcionó información completa"
        })
    }

}//READY

//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createForm = async (req, res) => {
    const { name, description, user_id, fields } = req.body
    if (name && description && user_id && fields) {
        try {
            const id = uuidv4()
            
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(80), name)
                .input('description', sql.VarChar(255), description)
                .input('fields', sql.NVarChar(MAX), fields)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('createFormulario')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Nuevo formulario creado'
                        })
                    }
                    return res.status(result.returnValue).json({
                        message: 'Creación de formulario fallida'
                    })
                })
        } 
        
        catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al ejecutar la creación de formulario'
            })
        }
    }


    else {
        return res.status(400).json({
            message: "No se proporcionó información completa"
        })
    }
}//READY

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateForm = async (req, res) => {
    const { id, name, description, fields, user_id} = req.body
    if (id, name && description && fields && user_id ) {
        try {            
            
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(80), name)
                .input('description', sql.VarChar(255), description)
                .input('fields', sql.NVarChar(MAX), fields)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('updateFormulario')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Se ha actualizado el formulario'
                        })
                    }
                    return res.status(result.returnValue).json({
                        message: 'Actualización de formulario fallida'
                    })
                })
        } 
        
        catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al ejecutar la actualización de formulario'
            })
        }
    }


    else {
        return res.status(400).json({
            message: "No se proporcionó información completa"
        })
    }
}//READY

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteForm = async (req, res) => {
    const id = req.params.id

    const pool = await getConnection()
    await pool
        .request()
        .input('id', sql.VarChar(255), id)
        .execute('del_form')
        .then(
            (result) => {
                return res.status(result.returnValue).json({
                    message: 'formulario deshabilitado'
                })
            },
            (error) => {
                console.log('Continuando ...')
                return res.status(500).json({
                    message: 'ha ocurrido un error al intentar deshabilitar el formulario'
                })
            }
        )
        .catch((error) => {
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al intentar deshabilitar el formulario'
            })
        })
}//READY