import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'
import { MAX } from 'mssql'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getPon = async (req, res) => {
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
                .execute('getPonentes')
                .then(result => {
                    return res.status(200).json(
                        result.recordset
                    )
                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar los ponentes'
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
export const createPon = async (req, res) => {
    try {
        const { nombre, apellido_p, apellido_m, email, user_id } = req.body
        if (nombre && apellido_p && apellido_m && email && user_id) {
            const id = uuidv4()
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('nombre', sql.VarChar(50), nombre)
                .input('apellido_p', sql.VarChar(50), apellido_p)
                .input('apellido_m', sql.VarChar(50), apellido_m)
                .input('email', sql.VarChar(100), email)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('createPonente')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Nuevo ponente registrado'
                        })
                    }
                    //When we get a negative response from SP
                    return res.status(result.returnValue).json({
                        message: 'Registro de ponente fallido'
                    })

                })
        }
        else {
            return res.status(400).json({
                message: "No se proporcionó información completa"
            })
        }
    } catch (err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de ponente'
        })
    }
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updatePon = async (req, res) => {
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deletePon = async (req, res) => {
}
