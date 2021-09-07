import { DataTypes, Sequelize } from "sequelize";
import config from '../config'

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

const sequelize = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, {
    host: 'localhost',
    dialect: 'mssql' 
})

const User = sequelize.define('User', {
  // Model attributes are defined here
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  credential: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  register_date:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
  },
  privileges:{
      type: DataTypes.INTEGER,
      defaultValue: 9
  }
}  // Other model options go here inside ,{ }
)

export const postLogin = async (req,res) => {
    const {user, password} = req.body

    if(user == null || password==null){
        return res.status(400).json({msg:"Bad request. Porfavor llene todos los campos"})
    }

    try{
        const user = User.build({
            user:"julius", 
            password:"PassMe1321", 
            description:'Test user'
        })
        console.log(user instanceof User)

        /*await pool.request()
            .input("User", sql.NVarChar, user)
            .input("Credential", sql.NVarChar, password)
            .execute('credentialverification')
            .then(result => {
                const verification = result.recordsets[0]
                if(verification == null){
                    res.status(401).json({msg:"Validación fallida"})
                }
                else{
                    
                    res.status(201).json({msg:'Validado'})
                    console.dir(verification)
                }

            })*/
        
               
    }catch(error){console.log(error)}
    
}