import jwt from 'jsonwebtoken'
import config from '../config'

//MÓDULO DE AUTENTICACIÓN DE TOKENS PARA PARTICIPANTES
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, config.jwt_APIKey)
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })

    }
}