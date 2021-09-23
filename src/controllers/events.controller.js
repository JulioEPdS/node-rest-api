import {getConnection, sql} from '../database/connection'

//Handles get method for all events ordered by ###############################################################
export const getEvents = async (req,res) => {
    /*const result = await Event.findAll({
        where: { status: 1 },
        order: [
            ['start_date', 'ASC'] //Defines order to get earlier events
        ]
    })*/
    //res.json(result)
    //console.log(result)

    const pool = await getConnection()
        await pool 
        .request()
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

export const postEvents = async (req,res) => {
    
}

export const deleteEvents = async (req,res) => {
    
}

export const putEvents = async (req,res) => {
    
}*/