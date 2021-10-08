import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'
import { MAX } from 'mssql'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getallForm = async(req,res)=>{
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .input('specific', sql.VarChar(6),'NO')
        .input('id',sql.VarChar(255),'noid')
        .execute('getFormularios')
        .then(result => {
            return res.status(200).json(
                result.recordset
            )
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar formularios'
        })

    }
}

//QUERYS ESPECÍFICOS PARA OBJETOS GET ONE//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getoneForm = async(req, res)=>{
}

//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createForm = async(req,res) =>{
    try{
        const {nombre, descripcion, creador, campos} = req.body
        const id=uuidv4()
        if(nombre && descripcion && creador && campos){
            var camposprocesados = []
            for (var i = 0; i<campos.length; i++){                                                
                var datos = {
                    id_form: id,
                    i_name: campos[i]["i_name"],
                    i_tipo: campos[i]["i_tipo"]
                }            
                camposprocesados.push(datos)
            }
            //console.log(JSON.stringify(camposprocesados))            
            const pool = await getConnection()
            await pool
            .request()
            .input('id', sql.VarChar(255),id)
            .input('nombre', sql.VarChar(50), nombre)
            .input('descripcion', sql.VarChar(100), descripcion)
            .input('user_id', sql.VarChar(255), creador)
            .input('campos', sql.NVarChar(MAX), JSON.stringify(camposprocesados))
            .execute('createFormulario')
            .then(result =>{
                if(result.returnValue == 201){
                    return res.status( result.returnValue ).json({
                        message: 'Nuevo formulario creado'})
                }
                return res.status( result.returnValue ).json({                    
                    message: 'Creación de formulario fallida'})
            })
        }
        else{
            return res.status( 400 ).json({
                msg:"No se proporcionó información completa"
            })
        }
        //console.log(campos)
                
        


    }catch(err){
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de formulario'
        })
    }
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateForm=async(req,res)=>{
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteForm=async(req,res)=>{
}