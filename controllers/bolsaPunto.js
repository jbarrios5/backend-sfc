const bolsaPunto = require("../models/bolsaPunto");
const Client = require("../models/client");

const getAllBolsa = async(req,res)=>{
    try {
        const bolsas = await bolsaPunto.find({})
        res.status(200).json({
            bolsas
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado al momento de obtener las bolsas'
        })
    }

}


const addBolsaPunto = async(req, res = response) => {
    try {

        const clientExist = await Client.findOne({documento:req.body.documentoCliente})
        if(!clientExist) return res.status(400).json({msg:'No existe cliente con el documento proveido'})

        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        //Dios protejenos 
        const bolsa = new bolsaPunto(req.body)

        //guardamos en la db para posteriormente retornar
        bolsa.save()

        res.status(200).json({
            bolsa,
            msg:'Bolsa punto agregado correctamente'
        });     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado al crear la bolsa'
        })
    }
   
}


const updateBolsaPunto = async(req, res = response) => {
    try {
        const { id } = req.params;
        
        const bolsa = await bolsaPunto.findByIdAndUpdate(req.body)
        //const client = await Client.findByIdAndUpdate( id, { estado: false } );    
        res.status(200).json({bolsa,msg:'Bolsa actualizado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'+error
        })
    }
}

const deleteBolsa = async(req, res = response) => {
    try {
        const { id } = req.params;
        const bolsaRemove = await Client.findByIdAndUpdate(id,{status:false})
        //const client = await Client.findByIdAndUpdate( id, { estado: false } );    
        res.status(200).json({msg:'Bolsa eliminado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'+error
        })
    }
    

    
}


module.exports = {
    addBolsaPunto,
    updateBolsaPunto,
    deleteBolsa,
    getAllBolsa
}