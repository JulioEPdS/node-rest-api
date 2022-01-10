import { Router } from 'express'
import { getWaitingEvents, postEvent, getActiveEvents, getHistorialEvents, activateEvent, deleteEvent, updateLiga } from '../controllers/events.controller'

import multer from 'multer'

const banners = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/banners')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})  

const uploadBanner = multer({ storage: banners })

const router = Router()

router.get("/espera/:id", getWaitingEvents)

router.get("/activos/:id", getActiveEvents)

router.get("/historial/:id", getHistorialEvents)

router.post('/', postEvent)

//BANNER UPLOAD AND MAIL_TEXT DEFINITION//////////////////////////
router.post("/activateEvent", uploadBanner.single('banner'), activateEvent) //<- AL MISMO TIEMPO SE DEBE REALIZAR INVITACIÓN POR CORREO

router.put("/updateLiga",updateLiga) //<- AL MISMO TIEMPO SE DEBE REALIZAR RECORDATORIOS POR CORREO



router.delete('/delete/:id', deleteEvent)

//router.put('/update/:eventId', patchEvent) DEPRECATED

export default router