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
);

export default User

