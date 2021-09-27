import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import config from './config'
import eventsRoutes from './routes/events.routes'
import usersRoutes from './routes/users.routes'
import publicRoutes from './routes/openapi.routes'
import objectsRoutes from './routes/objects.routes'
import checkAuth from './middleware/check-auth'

//PORCIÓN DE CÓDIGO QUE BLOQUEA TODO ACCESO A LA API QUE NO PROVENGA DE LA PÁGINA OFICIAL
//******NO recomendada porque también exluye conexiones desde endpoints que no sean un navegador****

const app = express()

// settings
app.set('port', config.port)

app.use(cors())
app.use(helmet())
app.use(morgan('short'))


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
//Todas deben cerrarse a la app web
app.use('/usuarios', usersRoutes) //check auth dentro del router de usuarios
app.use('/eventos', checkAuth, eventsRoutes)
app.use('/client', publicRoutes) //unica ruta abierta al público **Inscripciones, registros, consulta global de eventos, sin modificaciones
app.use('/objects', checkAuth, objectsRoutes)
//app.use('/informes', checkAuth,informRoutes)

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