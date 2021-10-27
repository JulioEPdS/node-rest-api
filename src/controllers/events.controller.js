import {getConnection, sql} from '../database/connection'
import {v4 as uuidv4} from 'uuid'

//Handles get method for all events ordered by ###############################################################
export const getEvents = async (req,res) => {    

    const pool = await getConnection()
        await pool 
        .request()
        .input('specific',sql.VarChar(6),'NO')
        .input('id',sql.VarChar(255),'NO')
        .execute( 'getEventos' )        
        .then( result => {
            if( result ){
                //DATABASE RESULT POSITIVE USER CREATED
                return res.status(200).json(result.recordset)
            }
            //When we get a negative response from SP EITHER CONFLICT OR ERROR                                  
        }) 
}

/*
//Handles the get method for a defined event #################################################################
export const getDefinedEvent = async (req,res) => {
    const id = req.params.eventId //extracts id from request
    res.status(200).json({
        message: 'GET con id definido',
        id: id
    })
}
*/
export const postEvent = async (req,res) => {
  try{
      const id = uuidv4()
      const {                
                titulo, 
                tipo, 
                descrip, 
                duracion, 
                fechainicio, 
                fechafin,
                horarios,
                certdoc,
                ponente,
                organismo,
                beneficiados,
                liga,
                formulario,
                usuario_id,
            } = req.body
        const banner_route = req.file.path

        if (id && titulo && tipo && descrip && duracion && fechainicio && fechafin && horarios && certdoc && ponente && organismo && beneficiados && banner_route && liga && formulario && usuario_id){            
            const pool = await getConnection()
            await pool 
            .request()
            .input('id',sql.VarChar(255),id)
            .input('titulo',sql.VarChar(80),titulo)
            .input('tipo',sql.VarChar(20),tipo)
            .input('descrip',sql.VarChar(255),descrip)
            .input('duracion',sql.VarChar(20),duracion)
            .input('fechainicio',sql.DateTime,fechainicio)
            .input('fechafin',sql.DateTime,fechafin)
            .input('horarios',sql.VarChar(255),horarios)
            .input('certdoc',sql.VarChar(255),certdoc)
            .input('ponente',sql.VarChar(255),ponente)
            .input('organismo',sql.VarChar(255),organismo)
            .input('beneficiados',sql.VarChar(100),beneficiados)
            .input('banner_route',sql.VarChar(255),banner_route)
            .input('liga',sql.VarChar(255),liga)
            .input('formulario',sql.VarChar(255),formulario)
            .input('usuario_id',sql.VarChar(255),usuario_id)
            .execute( 'createEvento' )
            .then( result => {
                if(result.returnValue == 201){
                    return res.status(result.returnValue).json({
                        message: 'Nuevo evento creado'
                    })
                }
                else{
                    return res.status(result.returnValue).json({
                        message: 'Creación de evento fallida'
                    })
                }
            })
        }
        else{
            return res.status( 400 ).json({
                msg:"No se proporcionó información completa"
            })
        }
  }
  catch(err){
    console.log(err)
    console.log('Continuando ...')
    return res.status(500).json({
        message: 'ha ocurrido un error al ejecutar la creación de formulario'
    })
  }  
}
/*
export const deleteEvents = async (req,res) => {
    
}

export const putEvents = async (req,res) => {
    
}*/