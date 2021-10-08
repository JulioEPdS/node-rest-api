import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'
import { MAX } from 'mssql'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getallPon = async(req,res)=>{
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .input('specific', sql.VarChar(6),'NO')
        .input('id',sql.VarChar(255),'noid')
        .execute('getPonentes')
        .then(result => {
            return res.status(200).json(
                result.recordset
            )
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar los ponentes'
        })
    }
}

//QUERYS ESPECÍFICOS PARA OBJETOS GET ONE//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getonePon = async(req, res)=>{
}

//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createPon = async(req,res) =>{
    try{
        const {nombre, apellido_p, apellido_m, correo, creador} = req.body
        if(nombre && apellido_p && apellido_m && correo && creador){
            const id = uuidv4()
            const pool = await getConnection()
            await pool
            .request()
            .input( 'id', sql.VarChar(255), id )
            .input( 'nombre', sql.VarChar(20), nombre )
            .input( 'primer', sql.VarChar(20), apellido_p )
            .input( 'segundo', sql.VarChar(20), apellido_m )
            .input( 'correo', sql.VarChar(80), correo)
            .input( 'user_id', sql.VarChar(255), creador )
            .execute( 'createPonente' )
            .then( result => {
                if(result.returnValue == 201){
                    return res.status( result.returnValue ).json({
                        message: 'Nuevo ponente registrado'})    
                }
                //When we get a negative response from SP
                return res.status( result.returnValue ).json({                    
                    message: 'Registro de ponente fallido'})

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
            message: 'ha ocurrido un error al ejecutar la creación de ponente'
        })
    }
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updatePon=async(req,res)=>{
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deletePon=async(req,res)=>{
}
