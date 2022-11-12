const premio = require("../models/premio");

const addPremio = async (req,res) => {
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const premios = new premio(req.body)
    
        //guardamos en la db para posteriormente retornar
        premios.save()
    
        res.status(200).json({
            premios,
            msg:'Premio agregado correctamente'
        });     
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:'Ocurrio un error inesperado al agregar un premio'
            })
        }


}

module.exports = {
    addPremio
}