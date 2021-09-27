import {Router} from 'express'
import {    
    getallCat,getallCert,getallEmp,getallForm,getallPon,
    createCat,createCert,createEmp,createForm,createPon
} from '../controllers/objects.controller'

import checkAuth from '../middleware/check-auth'


const router = Router()

//GETS PARA OBJETOS GET ALL
router.get('/categorias',getallCat)
router.get('/certdocs',getallCert)
router.get('/empresas',getallEmp)
router.get('/formularios',getallForm)
router.get('/ponentes',getallPon)

/*//GETS ESPECÍFICOS PARA OBJETOS GET ONE
router.get('/categorias')
router.get('/certdocs')
router.get('/empresas')
router.get('/formularios')
router.get('/ponentes')*/

//POSTS PARA OBJETOS
router.post('/categorias', createCat)
router.post('/certdocs', createCert)
router.post('/empresas', createEmp)
router.post('/formularios', createForm)
router.post('/ponentes',createPon)

///PATCH PARA OBJETOS
/*router.patch('/categorias')
router.patch('/certdocs')
router.patch('/empresas')
router.patch('/formularios')
router.patch('/ponentes')*/

///DELETE PARA OBJETOS
/*router.delete('/categorias')
router.delete('/certdocs')
router.delete('/empresas')
router.delete('/formularios')
router.delete('/ponentes')*/


export default router