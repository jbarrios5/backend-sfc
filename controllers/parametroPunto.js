const Parametro = require("../models/parametroPunto");

const getAllParametro = async(req,res)=>{
    try {
        const parametros = await parametro.find({})
        res.status(200).json({
            parametros
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado al momento de obtener los parametros'
        })
    }

}


const addParametro = async (req, res = response) => {
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const parametro = new Parametro(req.body)

        //guardamos en la db para posteriormente retornar
        parametro.save()

        res.status(200).json({
            parametro,
            msg: 'Parametro agregado exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear el parametro'
        })
    }

}


const updateParametro = async(req, res = response) => {
    try {
        const { id } = req.params;
        
        const param = await parametro.findByIdAndUpdate(req.body)
        res.status(200).json({bolsa,msg:'Parametro actualizado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'+error
        })
    }
}

const deleteParametro = async(req, res = response) => {
    try {
        const { id } = req.params;
        const parametroRemove = await Client.findByIdAndUpdate(id,{status:false})
        res.status(200).json({msg:'Parametro eliminado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'+error
        })
    }
    

    
}


module.exports = {
    addParametro,
    updateParametro,
    deleteParametro,
    getAllParametro
}