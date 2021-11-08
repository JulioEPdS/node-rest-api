import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getEmp = async (req, res) => {
    const { specific, id } = req.body
    if (specific && id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('specific', sql.VarChar(6), specific)
                .input('id', sql.VarChar(255), id)
                .execute('getEmpresas')
                .then(result => {
                    return res.status(200).json(
                        result.recordset
                    )
                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar las empresas'
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
export const createEmp = async (req, res) => {
    try {
        const { name, girops, phone, representante, r_social, user_id } = req.body
        if (name && girops && phone && representante && r_social && user_id) {
            const id = uuidv4()
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(100), name)
                .input('girops', sql.VarChar(255), girops)
                .input('phone', sql.VarChar(20), phone)
                .input('representante', sql.VarChar(80), representante)
                .input('r_social', sql.VarChar(100), r_social)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('createEmpresa')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Nueva empresa registrada'
                        })
                    }
                    return res.status(result.returnValue).json({
                        message: 'Registro de empresa fallida'
                    })
                })
        } else {
            return res.status(400).json({
                message: "No se proporcionó información completa"
            })
        }
    } catch (err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de empresa'
        })
    }
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateEmp = async (req, res) => {
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteEmp = async (req, res) => {
}