import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'
import {unlink} from 'fs'
import path from 'path'
//import slash from 'slash'


//SELECT * CONSTANCIAS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getallCert = async(req,res)=>{
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .input('specific', sql.VarChar(6),'NO')
        .input('id',sql.VarChar(255),'noid')
        .execute('getCertdocs')
        .then(result => {
            return res.status(200).json(
                result.recordset
            )
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar las constancias'
        })

    }
}

//QUERY ESPECÍFICOS PARA CONSTANCIAS GET ONE//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getoneCert = async(req, res)=>{
    try{
        //Código incompleto
        /*Código para enviar un archivo*/
        const ruta = "uploads/constancias/"
        var options={
            root: path.join('./')
        }
        res.sendFile(ruta,options, function(err){
            if(err){
                console.log(err)
                return
            }
            else{console.log("Enviado",ruta)}
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la consulta de constancia'
        })
    }
}

//PROCESO INSERT PARA CONSTANCIAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createCert = async(req,res) =>{
    const {tipo, nombre, descripcion, creador} = req.body
    const ruta = req.file.path
    try{                
        if(tipo && nombre && descripcion && ruta && creador){
            const id = uuidv4()
            const pool = await getConnection()
            await pool
            .request()
            .input('id',sql.VarChar(255), id)
            .input('tipo',sql.VarChar(20), tipo)
            .input('nombre',sql.VarChar(50), nombre)
            .input('descrip',sql.VarChar(255), descripcion)
            .input('base_r',sql.VarChar(100), ruta)
            .input('user_id',sql.VarChar(255), creador)
            .execute('createCertdoc')
            .then(result => {
                if(result.returnValue == 201){
                    return res.status( result.returnValue ).json({
                        message: 'Nuevo certificado creado'})
                }
                
                unlink(ruta,(err)=>{
                    if(err) throw err;
                    console.log('se canceló guardado de archivo debido a un conflicto/error')
                })
                return res.status( result.returnValue ).json({                    
                    message: 'Creación de constancia fallida'})                    
            })
        }else{
            unlink(ruta,(err)=>{
                if(err) throw err;
                console.log('se canceló guardado de archivo debido a un conflicto/error')
            })
            return res.status( 400 ).json({
                msg:"No se proporcionó información completa"
            })            
        }            
    }catch(err){
        console.log(err)
        console.log('Continuando ...')
        unlink(ruta,(err)=>{
            if(err) throw err;
            console.log('se canceló guardado de archivo debido a un conflicto/error')
        })
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de constancia'
        })
    }
}

///UPDATE PARA CONSTANCIAS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateCert=async(req,res)=>{
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCert=async(req,res)=>{    
}
