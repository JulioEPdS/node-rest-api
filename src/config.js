import {config} from 'dotenv'
config();

export default {
    port: process.env.PORT || 3000,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbServer: process.env.DB_SERVER || '',
    dbDatabase: process.env.DB_DATABASE || '',
    jwtKey: process.env.JWT_KEY || ''  ,
    jwt_APIKey: process.env.JWT_APIKEY || ''
}