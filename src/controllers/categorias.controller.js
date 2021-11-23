import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'


//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCat = async (req, res) => {
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
                .execute('getCategorias')
                .then(result => {
                    return res.status(200).json(
                        result.recordset
                    )
                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar las categorías'
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
export const createCat = async (req, res) => {
    const id = uuidv4()
    const { name, description, color, icon, user_id } = req.body
    if (id && name && description && color && icon && user_id) {
        try {            
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(20), name)
                .input('description', sql.VarChar(255), description)
                .input('color', sql.VarChar(20), color)
                .input('icon', sql.VarChar(20), icon)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('createCategoria')
                .then(result => {
                    if (result.returnValue == 201) {
                        return res.status(result.returnValue).json({
                            message: 'Nueva categoría creada'
                        })
                    }
                    //When we get a negative response from SP
                    return res.status(result.returnValue).json({
                        message: 'Creación de categoría fallida'
                    })

                })
        }

        catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al ejecutar la creación de categoría'
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
export const updateCat = async (req, res) => {
    const { id, name, description, color, icon, user_id } = req.body
    if (id && name && description && color && icon && user_id) {
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('id', sql.VarChar(255), id)
                .input('name', sql.VarChar(20), name)
                .input('description', sql.VarChar(255), description)
                .input('color', sql.VarChar(20), color)
                .input('icon', sql.VarChar(20), icon)
                .input('user_id', sql.VarChar(255), user_id)
                .execute('updateCategoria')
                .then(result => {
                    if (result.returnValue == 200) {
                        return res.status(result.returnValue).json({
                            message: 'Se actualizó la categoría'
                        })
                    }
                    //When we get a negative response from SP
                    return res.status(result.returnValue).json({
                        message: 'Actualización de categoría fallida'
                    })

                })

        } catch (err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al ejecutar la actualización de categoría'
            })
        }
    }
    else {
        return res.status(400).json({
            message: "No se proporcionó información completa"
        })
    }
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCat = async (req, res) => { }