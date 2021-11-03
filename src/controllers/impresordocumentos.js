import Jimp from 'jimp'
import {getConnection, sql} from '../database/connection'

export const imprimirdoc = async (textBeforeType,documentType,alternativeDocumentName,textoSecundario) => {
    

        if(documentType === "OTRO"){
            documentType = alternativeDocumentName//CUANDO ES DE OTRO TIPO 
        }
    
        //const documentType = "RECONOCIMIENTO" //pudiendo ser de otro tipo  
        const nombrePersona = "JULIO EMMANUEL PEREZ DE LOS SANTOS"
        //const textoSecundario = "Por haber participado en el taller en linea"
        const eventName = "NUEVO ETIQUETADO PARA PRODUCTOS ALIMENTICIOS NOM-051"
        const dateAndPlace = "TUXTLA GUTIERREZ, CHIAPAS; DICIEMBRE 17 DE 2021"
    
    
        //const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        const textBeforeTypeFont = await Jimp.loadFont('./uploads/fonts/LATO_21_GREY_BOLD.fnt')
        const documentTypeFont = await Jimp.loadFont('./uploads/fonts/LATO_68_CAFE.fnt')
        const nombrePersonaFont = await Jimp.loadFont('./uploads/fonts/LATO_28_DARK_BOLD.fnt')
        const textoSecundarioFont = await Jimp.loadFont('./uploads/fonts/LATO_30_GREY_LIGHT.fnt')
        const eventNameFont = await Jimp.loadFont('./uploads/fonts/LATO_30_GREY_BOLD.fnt')
        const dateAndPlaceFont = await Jimp.loadFont('./uploads/fonts/LATO_16_DARK_BOLD.fnt')
    
    
        /*for(var i in personas){
            const ruta = './constancia.jpg'
            const image = await Jimp.read(ruta);
            image.print(
                font,
                215,
                370,
                personas[i].nombre,
                900,            
            )
            let rutasalida = './reconocimiento'+personas[i].nombre+'.png'
            await image.writeAsync(rutasalida)
            //console.log(personas[i].nombre)
        }*/
    
    
        const ruta = './uploads/constancias/Constancia.png'
        const image = await Jimp.read(ruta)
    
    
        //IMPRIME "OTORGA LA O EL"
        image.print(
            textBeforeTypeFont,
            153,//Posición en X px
            231,//Posición en Y px
            {
                text: textBeforeType,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
            },
            //Ancho del área
            700
        )
    
        //IMPRIME TIPO DE DOCUMENTO
        image.print(
            documentTypeFont,
            153,//Posición en X px
            261,//Posición en Y px
            {
                text: documentType,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
            },
            //Ancho del área
            700
    
        )
    
        //IMPRIME NOMBRE
        image.print(
            nombrePersonaFont,
            206,
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
            153,
            430,
            {
                text: textoSecundario,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
            },
            700,
    
        )
    
        //IMPRIME NOMBRE DEL EVENTO
        image.print(
            eventNameFont,
            153,
            468,
            {
                text: '"' + eventName + '"',
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            },
            700,
            100
        )
    
        //IMPRIME LUGAR Y FECHA
        image.print(
            dateAndPlaceFont,
            279,
            577,
            {
                text: dateAndPlace,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
            },
            445
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

    const constancia = await imprimirdoc(textBeforeType,documentType,alternativeDocumentName,textoSecundario)
    var options = {
        root: './'
    }
    //console.log(constancia)
    return res.download(constancia)
}


export async function crearDesdeBD(req,res){
    let config = []
    try
    {
        const pool = await getConnection()
        await pool
        .request()
        .input('specific', sql.VarChar(6),'YES')
        .input('id',sql.VarChar(255),'certdoc1')
        .execute('getCertdocs')
        .then(result => {
            let str = result.recordset[0].config
            config = JSON.parse(str)
            return res.status(200).json({})
        })

    } catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar las constancias'
        })

    }
}