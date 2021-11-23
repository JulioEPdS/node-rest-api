import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'
import { MAX } from 'mssql'

//Handles get method for all events ordered by ###############################################################
export const getEvents = async (req, res) => {
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
                .execute('getEventos')
                .then(result => {
                    if (result) {
                        //DATABASE RESULT POSITIVE USER CREATED                        
                        return res.status(200).json(result.recordset)
                    }
                    return res.status(404).json({ message: 'No se halló el elemento' })
                    //When we get a negative response from SP EITHER CONFLICT OR ERROR                                  
                })
        }
        catch {
            return res.status(500).json({ message: 'Error interno del sistema' })
        }

    }
    else {
        return res.status(400).json({ message: 'No se proporcionó información completa' })
    }

}


//FOR CREATING A NEW EVENT
export const postEvent = async (req, res) => {
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

    const banner = req.file.path //MEJOR PONER ESTO APARTE 

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
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('title', sql.VarChar(100), title)
                .input('type', sql.VarChar(50), type)
                .input('project_type', sql.VarChar(50), project_type)
                .input('description', sql.VarChar(255), description)
                .input('duration', sql.VarChar(20), duration)
                .input('start_date', sql.Date, start_date)
                .input('end_date', sql.Date, end_date)
                .input('horarios', sql.NVarChar(MAX), horarios)
                .input('certdoc_id', sql.VarChar(255), certdoc_id)
                .input('ponente_id', sql.VarChar(255), ponente_id)
                .input('organismo', sql.VarChar(255), organismo)
                .input('beneficiados', sql.VarChar(255), beneficiados)
                .input('banner', sql.VarChar(255), banner) //MEJOR PONER ESTO APARTE
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
            msg: "No se proporcionó información completa"
        })
    }
}


//UPDATE DATA
export const patchEvent = async (req, res) => {
    const {
        id,
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
        liga &&
        formulario &&
        text_mail &&
        user_id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('title', sql.VarChar(100), title)
                .input('type', sql.VarChar(50), type)
                .input('project_type', sql.VarChar(50), project_type)
                .input('description', sql.VarChar(255), description)
                .input('duration', sql.VarChar(20), duration)
                .input('start_date', sql.Date, start_date)
                .input('end_date', sql.Date, end_date)
                .input('horarios', sql.NVarChar(MAX), horarios)
                .input('certdoc_id', sql.VarChar(255), certdoc_id)
                .input('ponente_id', sql.VarChar(255), ponente_id)
                .input('organismo', sql.VarChar(255), organismo)
                .input('beneficiados', sql.VarChar(255), beneficiados)                
                .input('liga', sql.VarChar(255), liga)
                .input('formulario', sql.VarChar(255), formulario)
                .input('text_mail', sql.NVarChar(MAX), text_mail)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('createEvento')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Evento actualizado'
                        })
                    }
                    else {
                        return res.status(result.returnValue).json({
                            message: 'Actualización de evento fallida'
                        })
                    }
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
            msg: "No se proporcionó información completa"
        })
    }
}


/*
export const deleteEvent = async (req,res) => {

}*/
