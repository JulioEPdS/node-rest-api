import {Router} from 'express'
import cors from 'cors'
import {postLogin} from '../controllers/users.controller'

const router = Router()

//router.post('/signup', cors(corsOptions), algunaruta)

router.post('/login', postLogin)


export default router