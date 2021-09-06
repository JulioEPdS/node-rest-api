import {Router} from 'express'
import {deleteEvents, getEvents, postEvents, putEvents} from '../controllers/topics.controller'
import cors from 'cors'

const whitelist = ['http://localhost:3000','http://192.168.2.32:3000']

const corsOptions = {
    origin: function (origin, callback) {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
        }
    },
    optionsSuccessStatus: 200
}



const router = Router()

router.get('/eventos', cors(corsOptions), getEvents)

//router.post('/eventos', cors(corsOptions), postEvents)

//router.get('/eventos', )

//router.delete('/eventos', cors(corsOptions), deleteEvents)

//router.put('/eventos', cors(corsOptions), putEvents)

export default router