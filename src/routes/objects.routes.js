import { Router } from 'express'
import { createCat, getallCat, getoneCat, updateCat, deleteCat } from '../controllers/categorias.controller'
import { createCert, getallCert, getoneCert, updateCert, deleteCert} from '../controllers/certdocs.controller'
import { createEmp, getallEmp, getoneEmp, updateEmp, deleteEmp } from '../controllers/empresas.controller'
import { createForm, getallForm, getoneForm, updateForm, deleteForm } from '../controllers/formularios.controller'
import { createPon, getallPon, getonePon, updatePon, deletePon } from '../controllers/pontentes.controller.js'

import multer from 'multer'

const constancias = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/constancias/')
    },
    filename: function(req, file, cb){        
        cb(null, Date.now() + file.originalname)
    }
})
/*fileFilter: .docx  PARA DELIMITAR EL TIPO DE ARCHIVO ACEPTADO*/
/*limits:{fileSize: 1024 * 1024 * 5}  PARA DELIMITAR EL TAMAÑO DE ARCHIVO ACEPTADO*/


const uploadC = multer({storage:constancias})

const router = Router()

//GETS PARA OBJETOS GET ALL
router.get('/categorias',getallCat)
router.get('/certdocs',getallCert)
router.get('/empresas',getallEmp)
router.get('/formularios',getallForm)
router.get('/ponentes',getallPon)

//GETS ESPECÍFICOS PARA OBJETOS GET ONE
router.get('/categoria/:id',getoneCat)
router.get('/certdoc/:id',getoneCert)
router.get('/empresa/:id',getoneEmp)
router.get('/formulario/:id',getoneForm)
router.get('/ponente/:id',getonePon)

//POSTS PARA OBJETOS
router.post('/categoria', createCat)
router.post('/certdoc', uploadC.single('base'), createCert)
router.post('/empresa', createEmp)
router.post('/formulario', createForm)
router.post('/ponente',createPon)

///PATCH PARA OBJETOS
router.patch('/categorias/:id',updateCat)
router.patch('/certdocs/:id',updateCert)
router.patch('/empresas/:id',updateEmp)
router.patch('/formularios/:id',updateForm)
router.patch('/ponentes/:id',updatePon)

///DELETE PARA OBJETOS
router.delete('/categorias/:id',deleteCat)
router.delete('/certdocs/:id',deleteCert)
router.delete('/empresas/:id',deleteEmp)
router.delete('/formularios/:id',deleteForm)
router.delete('/ponentes/:id',deletePon)

export default router