import sql from 'mssql'
import config from '../config'

import Sequelize from 'sequelize'

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
/*
export async function getConnection(){
    try{
        const pool = await sql.connect(dbSettings)
        return pool
    }catch(error){
        console.log(error)
    }
}

export {sql} */

export async function getConnection(){
    const sequelize = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, {
        host: 'localhost',
        dialect: 'mssql' 
      })

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

