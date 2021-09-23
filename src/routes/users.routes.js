import {Router} from 'express'
import {userLogin, userCreate} from '../controllers/users.controller'

const router = Router()


router.post('/login', userLogin)

router.post('/create', userCreate)

//router.post('/testjson', testJson)


export default router