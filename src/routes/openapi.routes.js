import {Router} from 'express'
import {participantInscript, participantLogin, participantSignup, participantValid, queryEventos} from '../controllers/openapi.controller'

const router = Router()

router.get('/eventos', queryEventos)

router.post('/login', participantLogin)

router.post('/registro', participantSignup)

router.post('/validacion',participantValid)

router.post('/inscripcion', participantInscript)



export default router