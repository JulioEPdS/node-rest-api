import config from '../config'
import Sequelize from 'sequelize' //Importing the connection

//Conection using ORM sequelize
const sequelize = new Sequelize(config.dbDatabase, config.dbUser, config.dbPassword, {
    host: 'localhost',
    dialect: 'mssql',
    define:{        
        timezone: '-05:00', //ADJUSTED FOR TIME OFFSET OF THE SERVER, remove if server has correct stamptime RUN QUERY to verify
        freezeTableName: true,
        timestamps: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
    /* run SELECT SYSDATETIME()  
    ,SYSDATETIMEOFFSET()  
    ,SYSUTCDATETIME()  
    ,CURRENT_TIMESTAMP  
    ,GETDATE()  
    ,GETUTCDATE(); to verify */
})

export default sequelize



//TO USE MSSQL LIBRARY AND COMMUNICATE DIRECTLY
/*const dbSettings ={
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: config.dbDatabase,
    //options: {
      //  encrypt: true, // for azure
      //  trustServerCertificate: true // change to true for local dev / self-signed certs
    //}
}

export async function getConnection(){
    try{
        const pool = await sql.connect(dbSettings)
        return pool
    }catch(error){
        console.log(error)
    }
}

export {sql} */