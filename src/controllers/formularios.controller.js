import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'
import { MAX } from 'mssql'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getForm = async (req, res) => {
    const { specific, id } = req.body
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

}

//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createForm = async (req, res) => {
    try {
        const { name, description, user_id, fields } = req.body
        const id = uuidv4()
        if (name && description && user_id && fields) {
            /*var camposprocesados = []
            for (var i = 0; i<fields.length; i++){                                                
                var datos = {
                    id_form: id,
                    i_name: fields[i]["i_name"],
                    i_tipo: fields[i]["i_tipo"]
                }            
                camposprocesados.push(datos)
            }*/
            //console.log(JSON.stringify(camposprocesados))            
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(50), name)
                .input('description', sql.VarChar(100), description)
                .input('fields', sql.NVarChar(MAX), JSON.stringify(fields))
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
        else {
            return res.status(400).json({
                message: "No se proporcionó información completa"
            })
        }
        //console.log(campos)




    } catch (err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de formulario'
        })
    }
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateForm = async (req, res) => {
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteForm = async (req, res) => {
}