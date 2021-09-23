import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import config from './config'
import eventsRoutes from './routes/events.routes'
import usersRoutes from './routes/users.routes'
import publicRoutes from './routes/openapi.routes'

/*PORCIÓN DE CÓDIGO QUE BLOQUEA TODO ACCESO A LA API QUE NO PROVENGA DE LA PÁGINA OFICIAL
******NO recomendada porque también exluye conexiones desde endpoints que no sean un navegador****
const whitelist = ['http://localhost:3000','http://192.168.2.32:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            return res.status(404).json({
                message: 'Not Allowed connection'
            })
        }
    },
    optionsSuccessStatus: 200
}*/

const app = express()

// settings
app.set('port', config.port)

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
//Todas deben cerrarse a la app web
app.use('/usuarios', usersRoutes) 
app.use('/eventos', eventsRoutes) 
app.use('/api', publicRoutes) //unica ruta abierta al público **Inscripciones, registros, consulta global de eventos, sin modificaciones
/*app.use('/certificados',certRoutes)
app.use('/categorias',categoRoutes)
app.use('/ponentes',speakRoutes)
app.use('/empresas',companyRoutes)
app.use('/informes',informRoutes)*/

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