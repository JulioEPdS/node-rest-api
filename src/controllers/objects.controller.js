import { getConnection } from '../database/connection'

export const getAllObjects = async (req, res) => {
    try {
        const pool = await getConnection()
        await pool
            .request()
            .execute('getObjects')
            .then(
                (result) => {                    
                    return res.status(304).json({
                        categorias: result.recordsets[0],
                        constancias: result.recordsets[1],
                        empresas: result.recordsets[2],
                        formularios: result.recordsets[3],
                        ponentes: result.recordsets[4]
                    })
                    
                }, 
                (error) => {
                    return res.status(result.status).json({
                        message: 'No se pudo consultar'
                    })
                })

    }
    catch(err) {
        console.log(err)
        console.log('Continuando ...')
        return res.status(500).json({
            message: 'ha ocurrido un error al consultar los objetos'
        })
    }
}