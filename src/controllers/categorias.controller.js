import { getConnection, sql } from '../database/connection'
import { v4 as uuidv4 } from 'uuid'


//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCat = async (req, res) => {
    const { specific, id } = req.body
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
    try {
        const { name, description, color, icon, user_id } = req.body
        if (name && description && color && icon && user_id) {
            const id = uuidv4()
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
        else {
            return res.status(400).json({
                message: "No se proporcionó información completa"
            })
        }

    } catch (err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de categoría'
        })
    }
}//READY

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateCat = async (req, res) => { }

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCat = async (req, res) => { }