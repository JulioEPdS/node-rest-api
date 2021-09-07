import {Router} from 'express'
import {deleteEvents, getDefinedEvent, getEvents, postEvents, putEvents} from '../controllers/events.controller'

const router = Router()

router.get('/', getEvents)

//router.post('/', cors(corsOptions), postEvents)

//router.get('/:eventId', cors(corsOptions), getDefinedEvent)

//router.delete('/:eventId', cors(corsOptions), deleteEvents)

//router.put('/', cors(corsOptions), putEvents)

export default router