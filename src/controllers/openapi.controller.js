import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'

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

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar'
        })

    }
}

export const queryLogin = async(req,res) => {
    res.json({
        msg:'Aún estoy trabajando en esto'
    })
}

export const querySignup = async(req,res) => {
    const {
        email,password,nombres,apellido_p,
        apellido_m,estado,municipio,telefono,
        sexo,ocupacion,fechanac,edad,rfc,curp,
        clasificacion,compartir
    } = req.body
    const id = uuidv4()
    try{
        const pool = await getConnection()
        await pool
        .request()
        .input('id',sql.VarChar(255),id)
        .input('email',sql.VarChar(50),email)
        .input('password',sql.VarChar(255),password)
        .input('name',sql.VarChar(50),nombres)
        .input('first',sql.VarChar(55),apellido_p)
        .input('second',sql.VarChar(50),apellido_m)
        .input('estado',sql.VarChar(50),estado)
        .input('municipio',sql.VarChar(50),municipio)
        .input('phone',sql.VarChar(20),telefono)
        .input('gender',sql.VarChar(20),sexo)
        .input('ocupation',sql.VarChar(100),ocupacion)
        .input('birthdate',sql.DateTime,fechanac)
        .input('edad',sql.Int,edad)
        .input('rfc',sql.VarChar(15),rfc)
        .input('curp',sql.VarChar(25),curp)
        .input('clasification',sql.VarChar(50),clasificacion)
        .input('compartir',sql.Bit,compartir)
        .execute('API_signup')
        .then(result => {
            if(result.returnValue == 409){
                return res.status(result.returnValue).json({
                    message: 'el correo especificado ya se encuentra en uso'
                })                
            }            
            else if(result.returnValue == 500){
                return res.status( result.returnValue ).json({                    
                    message: 'hubo un error con la base de datos'}) 
            }
            return res.status( result.returnValue ).json({
                message: 'registrado con éxito'
            })            
        })
    }catch(error) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            error: {
                message: 'error interno'
            }
        })

    }
}

export const queryValid = async(req,res) =>{
    res.json({
        msg:'Aún estoy trabajando en esto'
    })
}

export const queryInscript = async(req,res) =>{
    const {participante, email, evento,respuesta} = req.body
    const id = uuidv4()
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .input("id",sql.VarChar(255) ,id)
        .input("participante",sql.VarChar(255) ,participante)
        .input("email",sql.VarChar(255) ,email)
        .input("evento",sql.VarChar(255) ,evento)
        .input("respuesta",sql.VarChar(100) ,respuesta)
        .execute('API_inscription')
        .then(result => {
            if(result.returnValue == 409){
                return res.status(result.returnValue).json({
                    message: 'usted ya se encuentra inscrito'
                })                
            }            
            else if(result.returnValue == 500){
                return res.status( result.returnValue ).json({                    
                    message: 'hubo un error con la base de datos'}) 
            }
            return res.status( result.returnValue ).json({
                message: 'inscrito con éxito'
            }) 
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message:'ha ocurrido un error al inscribir'
        })        
    }
}


export const editarDatosCorreo = async(req,res)=>{
    res.json({
        msg:'Desde aquí enviamos un correo con una liga para editar los datos de alguien sin una cuenta'
    })
}