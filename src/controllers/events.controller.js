import {getConnection} from '../database/connection'


export const getEvents = async (req,res) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM eventos ORDER BY start_date')
    res.json(result.recordset)
}//Handles get method for all events ordered by 

export const getDefinedEvent = async (req,res) => {
    const id = req.params.eventId //extracts id from request
    res.status(200).json({
        message: 'GET con id definido',
        id: id
    })
}//Handles the get method for a defined event

export const postEvents = async (req,res) => {
    
}

export const deleteEvents = async (req,res) => {
    
}

export const putEvents = async (req,res) => {
    
}