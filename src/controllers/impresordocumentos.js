import Jimp from 'jimp'
import { getConnection, sql } from '../database/connection'

export const imprimirdoc = async (textBeforeType, documentType, alternativeDocumentName, textoSecundario) => {


    if (documentType === "OTRO") {
        documentType = alternativeDocumentName//CUANDO ES DE OTRO TIPO 
    }

    //const documentType = "RECONOCIMIENTO" //pudiendo ser de otro tipo  
    const nombrePersona = "JULIO EMMANUEL PEREZ DE LOS SANTOS"
    //const textoSecundario = "Por haber participado en el taller en linea"
    const eventName = "NUEVO ETIQUETADO PARA PRODUCTOS ALIMENTICIOS NOM-051"
    const dateAndPlace = "TUXTLA GUTIERREZ, CHIAPAS; DICIEMBRE 17 DE 2021"


    //const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const textBeforeTypeFont = await Jimp.loadFont('./fonts/LATO_21_GREY_BOLD.fnt')
    const documentTypeFont = await Jimp.loadFont('./fonts/LATO_68_CAFE.fnt')
    const nombrePersonaFont = await Jimp.loadFont('./fonts/LATO_28_DARK_BOLD.fnt')
    const textoSecundarioFont = await Jimp.loadFont('./fonts/LATO_30_GREY_LIGHT.fnt')
    const eventNameFont = await Jimp.loadFont('./fonts/LATO_30_GREY_BOLD.fnt')
    const dateAndPlaceFont = await Jimp.loadFont('./fonts/LATO_16_DARK_BOLD.fnt')



    const ruta = './uploads/constancias/Constancia.png'
    const image = await Jimp.read(ruta)


    //IMPRIME "OTORGA LA O EL"
    image.print(
        textBeforeTypeFont,
        78,//Posición en X px
        231,//Posición en Y px
        {
            text: textBeforeType,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        },
        //Ancho del área
        856
    )

    //IMPRIME TIPO DE DOCUMENTO
    image.print(
        documentTypeFont,
        78,//Posición en X px
        261,//Posición en Y px
        {
            text: documentType,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        },
        //Ancho del área
        856

    )

    //IMPRIME NOMBRE
    image.print(
        nombrePersonaFont,
        206,//POR FAVOR CONSIDERE EL INICIO DE LA LINEA PARA EL NOMBRE DE PERSONA
        374,
        {
            text: nombrePersona,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        },
        635

    )

    //IMPRIME TEXTO SECUNDARIO
    image.print(
        textoSecundarioFont,
        78,
        430,
        {
            text: textoSecundario,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        },
        856,

    )

    //IMPRIME NOMBRE DEL EVENTO
    image.print(
        eventNameFont,
        78,
        468,
        {
            text: '"' + eventName + '"',
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        856
    )

    //IMPRIME LUGAR Y FECHA
    image.print(
        dateAndPlaceFont,
        78,
        577,
        {
            text: dateAndPlace,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        },
        856
    )

    let rutasalida = './constancias/' + documentType + '-' + eventName + '-' + nombrePersona + '.png'
    await image.writeAsync(rutasalida)

    return (rutasalida)

    /*let personas = [
        { nombre: "Julio Emmanuel Pérez de los Santos" }
    ]*/

    //SI EL FORMATO YA TIENE IMPRESO EL TIPO DE


    //const textoAnteType = "OTORGA EL SIGUIENTE"

}



export async function enviarDoc(req, res) {
    const {
        textBeforeType, //"OTORGA LA" u "OTORGA EL"
        documentType, //TIPO DE DOC: CONSTANCIA, RECONOCIMIENTO, DIPLOMA, CERTIFICADO, OTRO
        //IF documentType === OTRO tomar este campo
        alternativeDocumentName,
        //nombrePersona, 
        textoSecundario, //EJ."Por haber asistido", "Por prestar sus serv"
        //eventName,
        //dateAndPlace
    } = req.body

    const constancia = await imprimirdoc(textBeforeType, documentType, alternativeDocumentName, textoSecundario)
    var options = {
        root: './'
    }
    //console.log(constancia)
    return res.download(constancia)
}


export async function crearDesdeBD(req, res) {
    const id = req.params.id
    let config = []
    let ruta = ''

    if (id) {
        console.log('Iniciando proceso de impresión...')
        //OBTENER CONFIGURACIÓN Y RUTA DE LA CONSTANCIA
        try {
            const pool = await getConnection()
            await pool
                .request()
                .input('specific', sql.VarChar(6), 'YES')
                .input('id', sql.VarChar(255), id)
                .execute('getCertdocs')
                .then(result => {
                    if (result.rowsAffected > 0) {
                        let str = result.recordset[0].config
                        config = JSON.parse(str)
                        ruta = result.recordset[0].base_route
                        console.log('Se leyó configuración de documento...')
                        //return res.status(200).json(result.recordset)
                    }
                    else if (result.rowsAffected === 0) {
                        console.log('No se halló certificado en la base de datos...')
                        return res.status(404).json({ message: 'NOT FOUND' })
                        //return res.status(200).json(result)
                    }

                })

        } catch (err) {
            console.log(err)
            console.log('Error al intentar leer config Continuando ... ACCIÓN CANCELADA')
            return res.status(500).json({
                message: 'ha ocurrido un error al consultar las constancias'
            })

        }
        //const documentType = "RECONOCIMIENTO" //pudiendo ser de otro tipo  MEJOR USADO DIRECTAMENTE ABAJO, REVISE
        const nombrePersona = "NOMBRE DE LA PERSONA"
        //const textoSecundario = "Por haber participado en el taller en linea" MEJOR USADO DIRECTAMENTE ABAJO, REVISE
        const eventName = "NOMBRE DEL EVENTO AQUI"
        const dateAndPlace = "TUXTLA GUTIERREZ, CHIAPAS; MMM DD DE YYYY"


        //SIEMPRE Y CUANDO HAYA CONFIG, EL DOCUMENTO EXISTE...
        //CREAR EL DOCUMENTO ACORDE A LA CONFIGURACION
        //const ruta = './uploads/constancias/Constancia.png' LA OBTENEMOS DESDE LA CONSULTA
        console.log(config)

        const image = await Jimp.read(ruta)
        const textBeforeTypeFont = await Jimp.loadFont(config?.textBeforeTypeFont || './fonts/LATO_21_GREY_BOLD.fnt')
        const documentTypeFont = await Jimp.loadFont(config?.documentTypeFont || './fonts/LATO_68_CAFE.fnt')
        const nombrePersonaFont = await Jimp.loadFont(config?.nombrePersonaFont || './fonts/LATO_28_DARK_BOLD.fnt')
        const textoSecundarioFont = await Jimp.loadFont(config?.textoSecundarioFont || './fonts/LATO_30_GREY_LIGHT.fnt')
        const eventNameFont = await Jimp.loadFont(config?.eventNameFont || './fonts/LATO_30_GREY_BOLD.fnt')
        const dateAndPlaceFont = await Jimp.loadFont(config?.dateAndPlaceFont || './fonts/LATO_16_DARK_BOLD.fnt')


        if (config?.textBeforeType === 'true') {
            //IMPRIME "OTORGA LA O EL"
            image.print(
                textBeforeTypeFont,
                parseInt(config?.textBeforeTypeX) || 78,//Posición en X px
                parseInt(config?.textBeforeTypeY) || 231,//Posición en Y px
                {
                    text: config?.textBeforeTypeContent,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                },
                //Ancho del área
                parseInt(config?.textBeforeTypeW) || 856,
                parseInt(config?.textBeforeTypeH) || 40
            )
        }

        //IMPRIME TIPO DE DOCUMENTO SI ESTÁ CONFIGURADO PARA IMPRIMIR
        if (config?.documentType === 'true') {
            image.print(
                documentTypeFont,
                parseInt(config?.documentTypeX) || 78,//Posición en X px
                parseInt(config?.documentTypeY) || 261,//Posición en Y px
                {
                    text: config?.documentTypeContent,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                },
                //Ancho del área
                parseInt(config?.documentTypeW) || 856,
                parseInt(config?.documentTypeW) || 80

            )
        }


        if (config?.nombrePersona === 'true') {
            //IMPRIME NOMBRE
            image.print(
                nombrePersonaFont,
                //AL EDITAR EL VALOR POR DEFECTO CONSIDERE EL INICIO DE LINEA DEL NOMBRE
                parseInt(config?.nombrePersonaX) || 206,
                parseInt(config?.nombrePersonaY) || 374,
                {
                    text: nombrePersona,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                },
                parseInt(config?.nombrePersonaW) || 635,
                parseInt(config?.nombrePersonaH) || 30

            )
        }

        if (config?.textoSecundario === 'true') {
            //IMPRIME TEXTO SECUNDARIO
            image.print(
                textoSecundarioFont,
                parseInt(config?.textoSecundarioX) || 78,
                parseInt(config?.textoSecundarioY) || 430,
                {
                    text: config.textoSecundarioContent,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                },
                parseInt(config?.textoSecundarioW) || 856,
                parseInt(config?.textoSecundarioH) || 40
            )
        }

        if (config?.eventName === 'true') {
            //IMPRIME NOMBRE DEL EVENTO
            image.print(
                eventNameFont,
                parseInt(config?.eventNameX) || 78,
                parseInt(config?.eventNameY) || 468,
                {
                    text: '"' + eventName + '"',
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                },
                parseInt(config?.eventNameW) || 856,
                parseInt(config?.eventNameH) || 100
            )
        }

        if (config?.dateAndPlace === 'true') {
            //IMPRIME LUGAR Y FECHA
            image.print(
                dateAndPlaceFont,
                parseInt(config?.dateAndPlaceX) || 78,
                parseInt(config?.dateAndPlaceY) || 577,
                {
                    text: dateAndPlace,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                },
                parseInt(config?.dateAndPlaceW) || 856,
                parseInt(config?.dateAndPlaceH) || 30
            )
        }

        let rutasalida = './constancias/' + config.documentTypeContent + '-' + eventName + '-' + nombrePersona + '.png'
        await image.writeAsync(rutasalida)
            .then((result) => { return res.download(rutasalida) })



    }
    else {
        return res.status(400).json({ message: 'Bad Request' })
    }


}



/*let data = []
                let str = []
                str = result.recordset[0].Horarios
                data = JSON.parse(str)
                for(var horario in data){
                    console.log('Hay una sesión: ',data[horario].fecha)
                }*/