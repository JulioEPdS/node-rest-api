import {Router} from 'express'
import {getEvents} from '../controllers/events.controller'
import checkAuth from '../middleware/check-auth'

const router = Router()

router.get('/', getEvents)

//router.post('/', checkAuth , postEvents)

//router.get('/:eventId',  getDefinedEvent)

//router.delete('/:eventId', deleteEvents)

//router.put('/', putEvents)

export default router