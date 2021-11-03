import { Router } from 'express'
import { createCat, getallCat, getoneCat, updateCat, deleteCat } from '../controllers/categorias.controller'
import { createCert, getallCert, getoneCert, updateCert, deleteCert } from '../controllers/certdocs.controller'
import { createEmp, getallEmp, getoneEmp, updateEmp, deleteEmp } from '../controllers/empresas.controller'
import { createForm, getallForm, getoneForm, updateForm, deleteForm } from '../controllers/formularios.controller'
import { createPon, getallPon, getonePon, updatePon, deletePon } from '../controllers/pontentes.controller.js'

//import multer from 'multer'

import { getAllObjects } from '../controllers/ovacpages.controller'

//MIDDLEWARE PARA MANEJAR SUBIDA DE DATOS
import { uploadC } from '../middleware/file-receiver'

const router = Router()


//GET GENERAL, obtiene todos los registros de objetos
router.get('/allobjects', getAllObjects)

//GETS PARA OBJETOS GET ALL
router.get('/categorias', getallCat)
router.get('/certdocs', getallCert)
router.get('/empresas', getallEmp)
router.get('/formularios', getallForm)
router.get('/ponentes', getallPon)

//GETS ESPECÍFICOS PARA OBJETOS GET ONE
router.get('/categoria/:id', getoneCat)
router.get('/certdoc/:id', getoneCert)
router.get('/empresa/:id', getoneEmp)
router.get('/formulario/:id', getoneForm)
router.get('/ponente/:id', getonePon)

//POSTS PARA OBJETOS
router.post('/categoria', createCat)
router.post('/certdoc', uploadC, createCert)//+ uploadC para obtener archivo desde req y guardar en servidor
router.post('/empresa', createEmp)
router.post('/formulario', createForm)
router.post('/ponente', createPon)

///PATCH PARA OBJETOS
router.patch('/categorias/:id', updateCat)
router.patch('/certdocs/:id', updateCert)
router.patch('/empresas/:id', updateEmp)
router.patch('/formularios/:id', updateForm)
router.patch('/ponentes/:id', updatePon)

///DELETE PARA OBJETOS
router.delete('/categorias/:id', deleteCat)
router.delete('/certdocs/:id', deleteCert)
router.delete('/empresas/:id', deleteEmp)
router.delete('/formularios/:id', deleteForm)
router.delete('/ponentes/:id', deletePon)

export default router