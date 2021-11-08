import config from '../config'
import jwt from 'jsonwebtoken'
import { getConnection, sql } from '../database/connection'
import {v4 as uuidv4} from 'uuid'


//CODE FOR HANDLING THE LOGIN REQUESTS ############################################################
export const userLogin = async ( req, res ) => {
    const { user, password } = req.body
    if( user && password ){
        try{
            const pool = await getConnection()
            await pool
            .request()
            .input( 'user', sql.VarChar(50), user )
            .input( 'password', sql.VarChar(50), password )
            .execute( 'userLogin' )
            .then( result => {
                if( result.returnValue !== 200 ){
                    //When we get a negative response from SP
                    return res.status( result.returnValue ).json({                    
                    message: 'Validación fallida'})
                }
            
                //GENERATE TOKEN USING JWT
                const token = jwt.sign({
                    user: user,                    
                },config.jwtKey,{
                expiresIn: "1h"
                })//JWT SIGN

                //WE SEND TOKEN, DATABASE RESULT POSITIVE MATCH (usuario and password)
                return res.status( result.returnValue ).json({
                    message: 'Credenciales verificadas',
                    token: token,                                      
                    info: result.recordset
                    
                })
           })  

        } catch(err) {
            console.log(err)
            console.log('Continuando ...')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar'
            })
    
        }  
    } 
    
    else { //BAD REQUEST
        return res.status( 400 ).json({
            msg:"No se proporcionó información completa"
        })
    }

}


//CODE FOR HANDLING THE SIGNUP REQUESTS ############################################################
export const userCreate = async ( req, res ) => {
    const { user, password, rol, nombre, apellido_p, apellido_m} = req.body
    const id = uuidv4()
    if( user && password && rol && nombre && apellido_p && apellido_m){
        const pool = await getConnection()
        await pool
        .request()
        .input( 'id', sql.VarChar(255), id )
        .input( 'user', sql.VarChar(50), user )
        .input( 'password', sql.VarChar(50), password )
        .input( 'nombre', sql.VarChar(50), nombre)
        .input( 'apellido_p', sql.VarChar(50), apellido_p)
        .input( 'apellido_m', sql.VarChar(50), apellido_m)
        .input( 'rol', sql.VarChar(20), rol )
        .execute( 'userCreate' )
        .then( result => {
            if( result.returnValue == 201 ){
                //DATABASE RESULT POSITIVE USER CREATED
                return res.status( result.returnValue ).json({
                message: 'Nuevo usuario creado'})
            }
            //When we get a negative response from SP EITHER CONFLICT OR ERROR
            return res.status( result.returnValue ).json({                    
                message: 'Error al crear'
            })
                       
        })        
    }
    
    else { //BAD REQUEST
        return res.status( 400 ).json({
            msg:"No se proporcionó información completa"
        })
    }
    
}


/*
export const testJson = async(req, res) =>{
    const json = JSON.stringify(req.body.datos)
    const pool = await getConnection()
    await pool 
    .request()        
    .input( 'JSON', sql.NVarChar(MAX), json)
    .execute( 'testJson' )
    .then( result => {
        return res.status(200).json({
            rsultado: result
            
      })
      
    })
}*/