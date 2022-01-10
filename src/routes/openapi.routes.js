import {Router} from 'express'
import {
    queryInscript, 
    queryLogin, 
    querySignup, 
    queryRegistro, 
    queryValid, 
    queryEventos, 
    sendBanner, 
    editarDatosControlled,
    reqUpgrade,
    upgradeLogIn,
    Upgrade
} from '../controllers/openapi.controller'

import checkPartAuth from '../middleware/check-part-auth'

const router = Router()

router.get('/eventos/:id', queryEventos) //READY

router.get('/getBanner/id', sendBanner) //READY



router.post('/registro', queryRegistro)
router.post('/signup', querySignup)

//router.post('/validacion',queryValid)

router.post('/inscripcion', queryInscript)


//SECURITY LOGIN//////////////////////////////////
router.post('/login', queryLogin)



/*EN DESARROLLO */
router.post('/editardatos', checkPartAuth,editarDatosControlled)
//Route to create a JWT, parse a link access to OVAC webapp to edit data
//Use checkAuth and set cors to only allow access through OVAC webapp


//PARA REALIZAR UN UPGRADE DE CUENTA
//router.post('/upgradeMe', reqUpgrade)
//router.post('/upgradeLogin', upgradeLogIn)
//router.post('/upgrade', checkPartAuth ,Upgrade)


export default router