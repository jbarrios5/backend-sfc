const Client = require("../models/client");
const { sendNotificationClientRegister } = require("./sendNotification");


const getAllClient = async (req, res) => {
    try {
        const clients = await Client.find({ status: true })
        res.status(200).json({
            clients
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener todos los clientes'
        })
    }

}

const addClient = async (req, res = response) => {
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const client = new Client(req.body)

        //guardamos en la db para posteriormente retornar
        client.save()

        const clientMail = req.body.correo;

        sendNotificationClientRegister(clientMail)

        res.status(200).json({
            client,
            msg: 'Cliente agregado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear cliente'
        })
    }

}

//solo se cambia el estado
//no se borra de la DB para no tener problemas de integridad referencial
const deleteClient = async (req, res = response) => {
    try {
        const { id } = req.params;
        console.log('Obtuvimos el id ' + id);
        //const clientRemove = await Client.findOneAndUpdate({documento:documento},{status:false})
        const client = await Client.findByIdAndUpdate(id, { status: false });
        res.status(200).json({ msg: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }



}

const updateClient = async (req, res = response) => {

    try {
        const { documento } = req.params;

        const clientUpdate = await Client.findOneAndUpdate({ documento: documento }, req.body)
        //const client = await Client.findByIdAndUpdate( id, { estado: false } );    
        res.status(200).json({ msg: 'Cliente actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}


const getClientByDocumento = async (req, res = response) => {
    try {
        const { documento } = req.params;
        const client = await Client
            .findOne({ documento: documento })
        res.status(200).json({
            client
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener el cliente'
        })
    }
}

module.exports = {
    addClient,
    deleteClient,
    updateClient,
    getAllClient,
    getClientByDocumento
}