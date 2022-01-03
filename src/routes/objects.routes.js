import { Router } from 'express'

//CONTROLADORES NECESARIOS//////////////////////////////////////////////////////////////////////////
import { createCat, getCat, updateCat, deleteCat } from '../controllers/categorias.controller'
import { createCert, getCert, updateCert, deleteCert } from '../controllers/certdocs.controller'
import { createEmp, getEmp, updateEmp, deleteEmp } from '../controllers/empresas.controller'
import { createForm, getForm, updateForm, deleteForm } from '../controllers/formularios.controller'
import { createPon, getPon, updatePon, deletePon } from '../controllers/pontentes.controller'

//import multer from 'multer' ¡¡DEPRECATED!!, INCLUSIÓN DE UN MIDDLEWARE PARA MANEJAR SUBIDA DE ARCHIVOS
//IMPORT  DE MIDDLEWARE PARA MANEJAR SUBIDA DE DATOS
import { uploadC } from '../middleware/file-receiver'

import { getAllObjects } from '../controllers/ovacpages.controller'


const router = Router()


//GET GENERAL, obtiene todos los registros de objetos/registros///////////////////////////
/****************************************************************************************/
/****************************************************************************************/
router.get('/allobjects', getAllObjects)





//GETS PARA OBJETOS FUNCIONAN TANTO PARA ESPECÍFICOS COMO PARA INDIVIDUALES
/****************************************************************************************/
/****************************************************************************************/
router.get('/categorias/:id', getCat)
router.get('/certdocs/:id', getCert)
router.get('/empresas/:id', getEmp)
router.get('/formularios/:id', getForm)
router.get('/ponentes/:id', getPon)





//POSTS PARA OBJETOS//////////////////////////////////////////////////////////////////////
/****************************************************************************************/
/****************************************************************************************/
router.post('/categoria', createCat)
//+ uploadC para obtener archivo desde req y guardar en servidor//////////////////////////
router.post('/certdoc', uploadC, createCert)
router.post('/empresa', createEmp)
router.post('/formulario', createForm)
router.post('/ponente', createPon)




///PUT PARA OBJETOS///////////////////////////////////////////////////////////////////////
/****************************************************************************************/
/* */
/* */
/****************************************************************************************/
router.put('/categorias/update', updateCat)
router.put('/certdocs/update', updateCert)
router.put('/empresas/update', updateEmp)
router.put('/formularios/update', updateForm)
router.put('/ponentes/update', updatePon)




///DELETE PARA OBJETOS MEJOR USAR POST////////////////////////////////////////////////////
/****************************************************************************************/
/* Aquí se espera tratar tratar todas las peticiones para eliminar algún registro, el   */
/* procedimiento es una desactivación en la BD, consultar scripts para verificar cómo.  */
/* DELETES NECESITAN ESPECIFICAR id PARA LOCALIZAR ELEMENTO A DESACTIVAR                */
/****************************************************************************************/
router.delete('/categorias/delete/:id', deleteCat)
router.delete('/certdocs/delete/:id', deleteCert)
router.delete('/empresas/delete/:id', deleteEmp)
router.delete('/formularios/delete/:id', deleteForm)
router.delete('/ponentes/delete/:id', deletePon)

export default router