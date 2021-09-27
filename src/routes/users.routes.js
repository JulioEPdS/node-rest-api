import {Router} from 'express'
import checkAuth from '../middleware/check-auth'
import {userLogin, userCreate} from '../controllers/users.controller'

const router = Router()


router.post('/login', userLogin)

router.post('/create', checkAuth ,userCreate)


export default router