import sql from 'mssql'
import config from '../config'

//TO USE MSSQL LIBRARY AND COMMUNICATE
const dbSettings ={
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: config.dbDatabase,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export async function getConnection(){
    try{
        const pool = await sql.connect(dbSettings)
        return pool
    }catch(error){
        console.log(error)
    }
}

export {sql}

