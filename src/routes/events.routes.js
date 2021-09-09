import {Router} from 'express'
import {getEvents} from '../controllers/events.controller'
import checkAuth from '../middleware/check-auth'

const router = Router()

router.get('/', getEvents)

//router.post('/', checkAuth , postEvents)

//router.get('/:eventId', cors(corsOptions), getDefinedEvent)

//router.delete('/:eventId', cors(corsOptions), deleteEvents)

//router.put('/', cors(corsOptions), putEvents)

export default router