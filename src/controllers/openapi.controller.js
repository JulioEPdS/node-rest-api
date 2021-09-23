import {getConnection, sql} from '../database/connection'

export const queryEventos = async(req,res) =>{
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .execute('API_geteventos')
        .then(result => {
            if(result.returnValue != 200){
                return res.status( result.returnValue ).json({                    
                    message: 'Error al consultar'}) 
            }
            return res.status( result.returnValue ).json(
                result.recordset
                )
        })

    } catch {

    }
}


export const participantLogin = async(req,res) => {
    res.json({
        msg:'Aún estoy trabajando en esto',
        mtd: 'LogIn method'
    })
}

export const participantSignup = async(req,res) => {
    res.json({
        msg:'dejaremos esto pendiente',
        mtd: 'SignUp method'
    })
}


export const participantValid = async(req,res) =>{
    res.json({
        msg:'Aún estoy trabajando en esto',
        mtd: 'LogIn method'
    })
}

export const participantInscript = async(req,res) =>{
    res.json({
        msg:'Aún estoy trabajando en esto',
        mtd: 'LogIn method'
    })
}

