import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import config from './config'
import fs from 'fs'

import checkAuth from './middleware/check-auth'
import checkPartAuth from './middleware/check-part-auth'

import eventsRoutes from './routes/events.routes'
import usersRoutes from './routes/users.routes'
import objectsRoutes from './routes/objects.routes'

import participantsRoutes from './routes/participants.routes'

import publicRoutes from './routes/openapi.routes'

import { crearDesdeBD, enviarDoc, imprimirdoc } from './controllers/impresordocumentos'

//export let mailSending = {e1:0, e2:0}
//PORCIÓN DE CÓDIGO QUE BLOQUEA TODO ACCESO A LA API QUE NO PROVENGA DE LA PÁGINA OFICIAL
//Pero posible de evadir modificando el HEADER Origin en la request **VULNERABLE** pero 
//mejor que tener la app sin el filtro de origen
const whitelist = ['http://localhost:3000', 'http://192.168.50.32:3000']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
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
app.use(express.urlencoded({ extended: false }))

// routes
//cors(corsOptions) se asegura de que exista un header de origen con la dirección del front-end !!NO ES UNA IMPLEMENTACIÓN ROBUSTA DE SEGURIDAD!!
//checkAuth se asegura de que la solicitud contenga un JWT válido y que pertenezca a este servidor !!IMPLEMENTACIÓN DE SEGURIDAD!!
app.use('/usuarios', cors(corsOptions), usersRoutes) //check auth dentro del router de registro/creación de usuarios

app.use('/eventos', cors(corsOptions), checkAuth, eventsRoutes)
app.use('/objects', cors(corsOptions), checkAuth, objectsRoutes)

app.use('/participantes', checkPartAuth, participantsRoutes)//Ruta para los participantes registrados

app.use('/client', publicRoutes) //unica ruta abierta al público **Inscripciones, registros, consulta global de eventos, sin modificaciones
//app.use('/informes', checkAuth,informRoutes)


/*#############################SEGMENTO DE PRUEBAS###############################################################*/
//app.use('/imprime',enviarDoc) //IMPRIME TEXTO SOBRE IMÁGEN, IDEAL PARA GENERAR RECONOCIMIENTOS
app.use('/creadesdebd', crearDesdeBD)

/*#############################SEGMENTO DE PRUEBAS###############################################################*/

//Handler for errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


/*setInterval(function(){
    console.log('Han pasado 30 segundos...')
},30*1000)*/


setInterval(function () {
    //const now = Date.now().toString()
    fs.readFile('./state.txt', 'utf-8', (err, data) => {

        if (data) {
            let oldData = JSON.parse(data)
            const dateinfile = parseInt(oldData['date'])
            const d = new Date(dateinfile)
            const n = new Date(Date.now())

            var seconds = (n.getTime() - d.getTime()) / 1000
            //console.log('Han pasado ', seconds, ' desde que se escribió')

            if (seconds > (864*100)) {
                let now = Date.now()
                let fecha = now.toString()
                let str = { "date": fecha, "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
                let newData = JSON.stringify(str)
                fs.writeFile('./state.txt', newData, function (err) {
                    if (err) console.log(err)

                    console.log('Han pasado al menos 24 hrs, reseteando emails diarios enviados...')
                    return
                })
            }

        }


        else {
            let now = Date.now()
            let fecha = now.toString()
            let str = { "date": fecha, "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
            let newData = JSON.stringify(str)
            fs.writeFile('./state.txt', newData, function (err) {
                if (err) console.log(err)

                console.log('Imprimi en archivo')
                return
            })
        }


    })
    
}, (60*1000))


export default app