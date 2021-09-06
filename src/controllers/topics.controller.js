import {getConnection} from '../database/connection'


export const getEvents = async (req,res) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM eventos ORDER BY start_date')
    res.json(result.recordset)
}

/*export const postEvents = async (req,res) => {
    const pool = await getConnection()
    const result = await pool.request().query('INSERT INTO eventos VALUES()')
    res.json(result.recordset)
}

export const deleteEvents = async (req,res) => {
    const pool = await getConnection()
    const result = await pool.request().query('INSERT INTO eventos VALUES()')
    res.json(result.recordset)
}

export const putEvents = async (req,res) => {
    const pool = await getConnection()
    const result = await pool.request().query('INSERT INTO eventos VALUES()')
    res.json(result.recordset)
}*/