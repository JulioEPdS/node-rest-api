import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../database/connection'

const Usuarios = sequelize.define('Usuarios', {
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
    type: DataTypes.STRING,
    defaultValue: 'No description'
  },
  register_date:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('SYSDATETIME()')
  },
  privileges:{
      type: DataTypes.INTEGER,
      defaultValue: 9
  }
}  // Other model options go here inside ,{ }
);

export default Usuarios

