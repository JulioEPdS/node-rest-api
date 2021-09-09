import { DataTypes, Sequelize } from "sequelize"
import sequelize from '../database/connection'

const Eventos = sequelize.define('Eventos', {
  // Model attributes are defined here
  id: {
      type: DataTypes.UUID,
      primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: 'No description'
  },
  duration:{
      type: DataTypes.STRING,      
  },
  start_date:{
      type: DataTypes.DATE,      
  },
  end_date:{
      type: DataTypes.DATE,      
  },
  company:{
      type: DataTypes.STRING,      
  },
  speaker:{
      type: DataTypes.STRING,      
  },
  cert_doc:{
      type: DataTypes.INTEGER,      
  },
  register_date:{
      type: DataTypes.DATE,      
  },
  register_user:{
      type: DataTypes.INTEGER,      
  },
  open_for:{
      type: DataTypes.INTEGER,      
  },
  status:{
      type: DataTypes.BOOLEAN,      
  },
  deleted:{
      type: DataTypes.BOOLEAN,      
  }
}  // Other model options go here inside ,{ }
)

export default Eventos
