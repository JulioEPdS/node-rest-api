import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../database/connection'

const Eventos = sequelize.define('Eventos', {
    guest_id:{ type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    first:{ type: DataTypes.STRING },
    second:{ type: DataTypes.STRING },
    mail:{ type: DataTypes.STRING },
    estado:{ type: DataTypes.STRING },
    municipio:{ type: DataTypes.STRING },
    phone:{ types: DataTypes.INTEGER },
    sex:{ type: DataTypes.STRING },
    ocupation:{ STRING },
    birthdate:{ date },
    age:{ type: DataTypes.INTEGER },
    rfc:{ type: DataTypes.STRING },
    curp:{ type: DataTypes.STRING },
    clasification_id:{ type: DataTypes.INTEGER },

} // Other model options go here inside ,{ }
)

export default Eventos


