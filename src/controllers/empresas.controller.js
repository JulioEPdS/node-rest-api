import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'

//QUERYS PARA OBJETOS GET ALL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            message: 'ha ocurrido un error al consultar las empresas'
        })

    }
}

//QUERYS ESPECÍFICOS PARA OBJETOS GET ONE//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getoneEmp = async(req, res)=>{
}

//QUERYS INSERT PARA OBJETOS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createEmp = async(req,res) =>{
    try{
        const {nombre, giro, telefono, representante, razon_social, folio_atn, creador} = req.body
        if(nombre && giro && telefono && representante && razon_social && folio_atn && creador){
            const id = uuidv4()
            const pool = await getConnection()
            await pool
            .request()
            .input('id',sql.VarChar(255), id)            
            .input('nombre',sql.VarChar(100), nombre)
            .input('girops',sql.VarChar(255), giro)
            .input('telefono',sql.VarChar(20), telefono)
            .input('representante',sql.VarChar(80), representante)
            .input('razonsocial',sql.VarChar(100), razon_social)
            .input('folio_atn',sql.VarChar(20), folio_atn)
            .input('user_id',sql.VarChar(255), creador)
            .execute('createEmpresa')
            .then(result => {
                if(result.returnValue == 201){
                    return res.status( result.returnValue ).json({
                        message: 'Nueva empresa registrada'})
                }
                return res.status( result.returnValue ).json({                    
                    message: 'Registro de empresa fallida'})
            })
        }else{
            return res.status( 400 ).json({
                msg:"No se proporcionó información completa"
            })
        }
    }catch(err){
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al ejecutar la creación de empresa'
        })
    }
}

///QUERYS UPDATE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateEmp=async(req,res)=>{
}

///QUERYS DELETE PARA OBJETOS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteEmp=async(req,res)=>{    
}