import {Router} from 'express'
import {getEvents, postEvent} from '../controllers/events.controller'

import multer from 'multer'

const banners = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/banners')
    },
    filename: function(req, file, cb){        
        cb(null, Date.now() + file.originalname)
    }
})

const uploadBanner = multer({storage:banners})


const router = Router()

router.get("/:id", getEvents)

router.post('/',uploadBanner.single('banner'), postEvent)

//router.get('/:eventId',  getDefinedEvent)

//router.delete('/:eventId', deleteEvent)

//router.patch('/:eventId', patchEvent)

export default router