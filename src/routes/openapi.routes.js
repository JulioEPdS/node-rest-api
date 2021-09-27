import {Router} from 'express'
import {
    editarDatosCorreo, queryInscript, 
    queryLogin, querySignup, queryValid, 
    queryEventos
} from '../controllers/openapi.controller'

const router = Router()

router.get('/eventos', queryEventos)

router.post('/login', queryLogin)

router.post('/registro', querySignup)

router.post('/validacion',queryValid)

router.post('/inscripcion', queryInscript)

router.post('/editardatos',editarDatosCorreo)

export default router