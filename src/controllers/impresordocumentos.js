import Jimp from 'jimp'

export const imprimirdoc = async(req,res)=>{

    let personas = [
        {nombre:"Juan Armendariz"}        
    ]

    
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    
    for(var i in personas){
        const ruta = './constancia.jpg'
        const image = await Jimp.read(ruta);
        image.print(
            font,
            50,
            30,
            personas[i].nombre,
            150,            
        )
        let rutasalida = './reconocimiento'+personas[i].nombre+'.png'
        await image.writeAsync(rutasalida)
        //console.log(personas[i].nombre)
    }
                
}