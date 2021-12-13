import checkAuth from './middleware/check-auth'
import checkPartAuth from './middleware/check-part-auth'


import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import config from './config'
import fs from 'fs'


import eventsRoutes from './routes/events.routes'
import usersRoutes from './routes/users.routes'
import objectsRoutes from './routes/objects.routes'


import participantsRoutes from './routes/participants.routes'
import publicRoutes from './routes/openapi.routes'


//PRUEBAS//////////////////////////////////////////////////////////////////////////////////
import { crearDesdeBD, enviarDoc, imprimirdoc } from './controllers/impresordocumentos'
//PRUEBAS//////////////////////////////////////////////////////////////////////////////////





//PORCIÓN DE CÓDIGO QUE BLOQUEA TODO ACCESO A LA API QUE NO PROVENGA DE LA PÁGINA OFICIAL//
/*****************************************************************************************/
/* Pero posible de evadir modificando el HEADER Origin en la request **VULNERABLE** pero */
/* mejor que tener la app sin el filtro de origen, OPENAPI routes sin embargo, son acce- */
/* sibles a través de una vía pública, desde cualquier origen,bajo diferentes TOKENSyAUTH*/
/*****************************************************************************************/
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




//INICIALIZACIÓN DE LA API REST////////////////////////////////////////////////////////////
/*****************************************************************************************/
/* CARGAR LIBRERÍAS Y PREPARAR ENTORNO, CARGAR MIDLEWARES                                */
/*****************************************************************************************/
const app = express()
// settings////////////////////////////////////////////////////////////////////////////////
app.set('port', config.port)
// middlewares/////////////////////////////////////////////////////////////////////////////
app.use(cors())
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// ROUTES O RUTAS, DEFINEN LAS DIFERENTES OPCIONES PRINCIPALES QUE HAY EN EL SERVER
/******************************************************************************************/
/* "cors(corsOptions)" se asegura de que el header de origen coincida con la dirección del*/
/* front-end, sin embargo, !!NO ES UNA IMPLEMENTACIÓN ROBUSTA DE SEGURIDAD!!              */
/* "checkAuth" se asegura de que la solicitud contenga un JWT válido y que pertenezca a   */
/* este servidor !!IMPLEMENTACIÓN DE SEGURIDAD POR MEDIO DE JWT!!                         */
/******************************************************************************************/
//check auth dentro del router /usuarios////////////////////////////////////////////////////
app.use('/usuarios', cors(corsOptions), usersRoutes) 
app.use('/eventos', cors(corsOptions), checkAuth, eventsRoutes)
app.use('/objects', cors(corsOptions), checkAuth, objectsRoutes)
//app.use('/informes', checkAuth,informRoutes) EN CONSTRUCCIÓN//////////////////////////////////


//RUTAS DE API PÚBLICA, PARA APLICACIÓN MÓVIL Y CUALQUIER OTRO DESARROLLO///////////////////////
//Ruta para los participantes registrados///////////////////////////////////////////////////////
app.use('/participantes', checkPartAuth, participantsRoutes)
//unica ruta abierta al público **Inscripciones, registros, consulta , sin modificaciones///////
app.use('/client', publicRoutes) 


//SEGMENTO DE PRUEBAS///////////////////////////////////////////////////////////////////////////
app.use('/imprime',enviarDoc) //IMPRIME TEXTO SOBRE IMÁGEN, IDEAL PARA GENERAR RECONOCIMIENTOS
//app.use('/creadesdebd', crearDesdeBD)
/*#############################SEGMENTO DE PRUEBAS############################################*/





//ERROR HANDLING////////////////////////////////////////////////////////////////////////////
/******************************************************************************************/
/* En las líneas a continuacion se manejan los errores que pueden surgir durante ejecucion*/
/******************************************************************************************/
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






//VERIFICACIÓN PROGRAMADA///////////////////////////////////////////////////////////////////
/******************************************************************************************/
/* Dadas las políticas de envío masivo propuesto por los servicios de correo, es necesario*/
/* contar con una estratégia que permita saber si los correos del sistema están dentro del*/
/* margen aceptable de envíos diarios, cada 24 horas un correo puede recupera su capacidad*/
/* base de 300 correos, después de 24hrs el sistema restablece el contador de emails.     */
/******************************************************************************************/
//CONFORME A LO QUE SE DISCUTIÓ EL 23/11/2021, SE MODIFICARÁ ESTA APROXIMACIÓN
setInterval(function () {        
    fs.readFile('./state.txt', 'utf-8', (err, data) => {

        if (data) {
            let oldData = JSON.parse(data)
            const dateinfile = parseInt(oldData['date'])
            const d = new Date(dateinfile)
            const n = new Date(Date.now())

            var seconds = (n.getTime() - d.getTime()) / 1000            

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