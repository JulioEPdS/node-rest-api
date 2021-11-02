import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import config from './config'

import checkAuth from './middleware/check-auth'
import checkPartAuth from './middleware/check-part-auth'

import eventsRoutes from './routes/events.routes'
import usersRoutes from './routes/users.routes'
import publicRoutes from './routes/openapi.routes'
import objectsRoutes from './routes/objects.routes'
import participantsRoutes from './routes/participants.routes'
import { imprimirdoc } from './controllers/impresordocumentos'


//PORCIÓN DE CÓDIGO QUE BLOQUEA TODO ACCESO A LA API QUE NO PROVENGA DE LA PÁGINA OFICIAL
//Pero posible de evadir modificando el HEADER Origin en la request **VULNERABLE** pero 
//mejor que tener la app sin el filtro de origen
const whitelist = ['http://localhost:3000','http://192.168.50.32:3000']

const corsOptions = {
    origin: function (origin, callback) {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            console.log("Unauthorized atempt to use API routes")
            throw Error("Not allowed to use");            
        }
    },
    optionsSuccessStatus: 200
}


const app = express()

// settings
app.set('port', config.port)

app.use(cors())
app.use(helmet())
app.use(morgan('common'))


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
//Todas deben cerrarse a la app web
app.use('/usuarios',cors(corsOptions), usersRoutes) //check auth dentro del router de registro/creación de usuarios
app.use('/eventos',cors(corsOptions), checkAuth, eventsRoutes)
app.use('/client', publicRoutes) //unica ruta abierta al público **Inscripciones, registros, consulta global de eventos, sin modificaciones
app.use('/objects',cors(corsOptions), checkAuth, objectsRoutes)
app.use('/participantes',checkPartAuth, participantsRoutes)//Ruta para los participantes registrados
//app.use('/informes', checkAuth,informRoutes)


/*#############################SEGMENTO DE PRUEBAS######################################################*/
app.use('/imprime',imprimirdoc)

/*#############################SEGMENTO DE PRUEBAS######################################################*/

//Handler for errors
app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

export default app