import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'


//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getallCat = async(req,res)=>{
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .input('specific', sql.VarChar(6),'NO')
        .input('id',sql.VarChar(255),'noid')
        .execute('getCategorias')
        .then(result => {
                return res.status(200).json(
                result.recordset
            )
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar las categorías'
        })

    }
}

//QUERYS ESPECÍFICOS PARA OBJETOS GET ONE//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getoneCat = async(req, res)=>{}

//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createCat = async(req,res) =>{
    try{
        const {nombre, descripcion,color, icon, creador} = req.body
        if(nombre && descripcion && color && icon && creador){
            const id = uuidv4()
            const pool = await getConnection()
            await pool
            .request()
            .input( 'id', sql.VarChar(255), id )
            .input( 'nombre', sql.VarChar(20), nombre )
            .input( 'descrip', sql.VarChar(255), descripcion )
            .input( 'color', sql.VarChar(20), color)
            .input( 'icon', sql.VarChar(20), icon)
            .input( 'usuario_id', sql.VarChar(255), creador )
            .execute( 'createCategoria' )
            .then( result => {
                if(result.returnValue == 201){
                    return res.status( result.returnValue ).json({
                        message: 'Nueva categoría creada'})    
                }
                //When we get a negative response from SP
                return res.status( result.returnValue ).json({                    
                    message: 'Creación de categoría fallida'})

            })
        }
        else{
            return res.status( 400 ).json({
                msg:"No se proporcionó información completa"
            })
        }

    }catch(err){
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de categoría'
        })
    }
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateCat=async(req,res)=>{}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCat=async(req,res)=>{}