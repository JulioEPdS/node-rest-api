import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getEmp = async (req, res) => {
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

}//READY

//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createEmp = async (req, res) => {
    const id = uuidv4()
    const { name, girops, phone, representante, r_social, user_id } = req.body
    if (id && name && girops && phone && representante && r_social && user_id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(100), name)
                .input('girops', sql.VarChar(255), girops)
                .input('phone', sql.VarChar(255), phone)
                .input('representante', sql.VarChar(80), representante)
                .input('r_social', sql.VarChar(255), r_social)
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

        }

        catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al ejecutar la creación de empresa'
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
export const updateEmp = async (req, res) => {
    const {id, name, girops, phone, representante, r_social, user_id } = req.body
    if (id && name && girops && phone && representante && r_social && user_id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(100), name)
                .input('girops', sql.VarChar(255), girops)
                .input('phone', sql.VarChar(255), phone)
                .input('representante', sql.VarChar(80), representante)
                .input('r_social', sql.VarChar(100), r_social)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('updateEmpresa')
                .then(result => {
                    if (result.returnValue == 200) {
                        return res.status(result.returnValue).json({
                            message: 'Se ha actualizado los datos de la empresa'
                        })
                    }
                    return res.status(result.returnValue).json({
                        message: 'Actualización de datos fallida'
                    })
                })

        }

        catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al ejecutar la creación de empresa'
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
export const deleteEmp = async (req, res) => {
    const id = req.params.id

    const pool = await getConnection()
    await pool
        .request()
        .input('id', sql.VarChar(255), id)
        .execute('del_emp')
        .then(
            (result) => {                                
                return res.status(result.returnValue).json({
                    message: 'empresa deshabilitada'
                })
            },
            (error) => {                
                console.log('Continuando ...')
                return res.status(500).json({
                    message: 'ha ocurrido un error al intentar deshabilitar la empresa'
                })
            }
        )
        .catch((error) => {            
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al intentar deshabilitar la empresa'
            })
        })
}//READY