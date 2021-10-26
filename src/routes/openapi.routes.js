import {Router} from 'express'
import {
    editarDatosCorreo, queryInscript, 
    queryLogin, querySignup, queryRegistro, queryValid, 
    queryEventos
} from '../controllers/openapi.controller'

const router = Router()

router.get('/eventos', queryEventos)

router.post('/login', queryLogin)

router.post('/registro', queryRegistro)

router.post('/signup', querySignup)

router.post('/validacion',queryValid)

router.post('/inscripcion', queryInscript)

router.post('/editardatos',editarDatosCorreo)
//Route to create a JWT, parse a link access to OVAC webapp to edit data
//Use checkAuth and set cors to only allow access through OVAC webapp

export default router