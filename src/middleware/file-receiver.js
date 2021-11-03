import multer from 'multer'


//CONFIGURACIÓN PARA GUARDAR BASE DE CONSTANCIAS RECIBIDAS
const constanciasStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/constancias')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

//Configuración filtro de extensión de archivo, REJECTS ANY TYPE != (JPG||PNG)
const constanciaFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||  file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null, true)
    }
    else {        
        cb(new Error("Extensión de archivo no soportada, envíe archivos .png o .jpg"), false)
    }
}

//Configuración de límite de tamaño de archivo 2MB
const constanciaLimit = { fileSize: 1024 * 1024 * 2 }


export const uploadC = multer(
    {
        storage: constanciasStorage,
        fileFilter: constanciaFilter,
        limits: constanciaLimit
    }
).single('base')