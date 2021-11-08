import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'
import { MAX } from 'mssql'

//Handles get method for all events ordered by ###############################################################
export const getEvents = async (req, res) => {
    const { specific, id } = req.body

    if (specific && id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('specific', sql.VarChar(6), specific)
                .input('id', sql.VarChar(255), id)
                .execute('getEventos')
                .then(result => {
                    if (result) {
                        //DATABASE RESULT POSITIVE USER CREATED                        
                        return res.status(200).json(result.recordset)
                    }
                    return res.status(404).json({message:'No se halló el elemento'})
                    //When we get a negative response from SP EITHER CONFLICT OR ERROR                                  
                })
        }
        catch{
            return res.status(500).json({message:'Error interno del sistema'})
        }
        
    }
    else {
        return res.status(400).json({ message: 'No se proporcionó información completa' })
    }

}

/*
//Handles the get method for a defined event #################################################################
export const getDefinedEvent = async (req,res) => {
    const id = req.params.eventId //extracts id from request
    res.status(200).json({
        message: 'GET con id definido',
        id: id
    })
}
*/
export const postEvent = async (req, res) => {
    try {
        const id = uuidv4()
        const {
            title,
            type,
            project_type,
            description,
            duration,
            start_date,
            end_date,
            horarios,
            certdoc_id,
            ponente_id,
            organismo,
            beneficiados,
            liga,
            formulario,
            text_mail,
            user_id,
        } = req.body
        const banner = req.file.path

        if (id &&
            title &&
            type &&
            project_type &&
            description &&
            duration &&
            start_date &&
            end_date &&
            horarios &&
            certdoc_id &&
            ponente_id &&
            organismo &&
            beneficiados &&
            banner &&
            liga &&
            formulario &&
            text_mail &&
            user_id) {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('title', sql.VarChar(80), title)
                .input('type', sql.VarChar(20), type)
                .input('project_type', sql.VarChar(20), project_type)
                .input('description', sql.VarChar(255), description)
                .input('duration', sql.VarChar(20), duration)
                .input('start_date', sql.Date, start_date)
                .input('end_date', sql.Date, end_date)
                .input('horarios', sql.NVarChar(MAX), horarios)
                .input('certdoc_id', sql.VarChar(255), certdoc_id)
                .input('ponente_id', sql.VarChar(255), ponente_id)
                .input('organismo', sql.VarChar(255), organismo)
                .input('beneficiados', sql.VarChar(100), beneficiados)
                .input('banner', sql.VarChar(255), banner)
                .input('liga', sql.VarChar(255), liga)
                .input('formulario', sql.VarChar(255), formulario)
                .input('text_mail', sql.NVarChar(MAX), text_mail)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('createEvento')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Nuevo evento creado'
                        })
                    }
                    else {
                        return res.status(result.returnValue).json({
                            message: 'Creación de evento fallida'
                        })
                    }
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
            message: 'ha ocurrido un error al ejecutar la creación de formulario'
        })
    }
}
/*
export const deleteEvents = async (req,res) => {

}

export const putEvents = async (req,res) => {

}*/