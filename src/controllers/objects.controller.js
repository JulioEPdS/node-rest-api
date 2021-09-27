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
            message: 'ha ocurrido un error al consultar'
        })

    }
}
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
            message: 'ha ocurrido un error al consultar'
        })

    }
}
export const getallEmp = async(req,res)=>{
    try
    {
        const input1 = 'NO'
        const input2 = 'NO'
        const pool = await getConnection()
        await pool
        .request()
        .input('specific', sql.VarChar(6),input1)
        .input('id',sql.VarChar(255),input2)
        .execute('getEmpresas')
        .then(result => {
                return res.status(200).json(
                result.recordset
            )
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar'
        })

    }
}
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
            message: 'ha ocurrido un error al consultar'
        })

    }
}
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
            message: 'ha ocurrido un error al consultar'
        })

    }
}

//QUERYS ESPECÍFICOS PARA OBJETOS GET ONE//////////////////////////////////////////////////////////////////////////////////////////////////////////


//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createCat = async(req,res) =>{

}
export const createCert = async(req,res) =>{
    
}
export const createEmp = async(req,res) =>{
    
}
export const createForm = async(req,res) =>{
    
}
export const createPon = async(req,res) =>{
    
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

