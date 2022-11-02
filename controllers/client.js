const Client = require("../models/client");

const addClient = async(req, res = response) => {
    try {
    //se agrega todo lo que viene del frontend
    const client = new Client(req.body)

    //guardamos en la db para posteriormente retornar
    client.save()

    res.status(200).json({
        client,
        msg:'Cliente agregado correctamente'
    });     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado al crear cliente'
        })
    }
   
}
module.exports = {
    addClient
}