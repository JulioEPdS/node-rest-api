import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../database/connection'
//Sequelize.literal('SYSDATETIME()') TIEMPO DEL SISTEMA
const Usuarios = sequelize.define('Usuarios', {
  // Model attributes are defined here
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  privileges: {
    type: DataTypes.INTEGER,
    defaultValue: 9325
  },
  name:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  first:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  second:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  estado:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  municipio:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  phone:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  sex:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  ocupation:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  birthdate:{
      type: DataTypes.DATEONLY,
      defaultValue: '2999-12-31'
  },
  age:{
      type: DataTypes.INTEGER,
      defaultValue: 0
  },
  rfc:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  curp:{
      type: DataTypes.STRING,
      defaultValue: 'No definido'
  },
  clasification_id:{
      type: DataTypes.INTEGER,
      defaultValue: 0
  },
  register_date:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('SYSDATETIME()')
  },
  lastUpdate_date:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('SYSDATETIME()')
  }

} ,{tableName: 'usuarios'} // Other model options go here inside ,{ }
);

export default Usuarios

