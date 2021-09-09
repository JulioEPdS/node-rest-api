import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../database/connection'

const Eventos = sequelize.define('Eventos', {

} // Other model options go here inside ,{ }
)

export default Eventos