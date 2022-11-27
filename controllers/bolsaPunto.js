const { formatoDate } = require("../helpers/obtenerPuntoCompra");
const bolsaPunto = require("../models/bolsaPunto");
const Client = require("../models/client");
const { NotificationExpirePuntos } = require("./sendNotification");

const getAllBolsa = async (req, res) => {


    try {
        const bolsas = await bolsaPunto.find({})

        console.log("Listado de bolsas", bolsas)

        bolsas.forEach((bolsa, index) => {

            var actualDate = new Date();

            function toLocal(actualDate) {
                var local = new Date(actualDate);
                local.setMinutes(date.getMinutes() - actualDate.getTimezoneOffset());
                return local.toJSON();
            }

            function toJSONLocal(actualDate) {
                var local = new Date(actualDate);
                local.setMinutes(actualDate.getMinutes() - actualDate.getTimezoneOffset());
                return local.toJSON().slice(0, 10);
            }

            const dateExpire = new Date(bolsa.fechaCaducidadPuntaje)
            const notificationDate = new Date(bolsa.fechaCaducidadPuntaje)
            const parametroDate = formatoDate(actualDate)
            const verifyNotificationDate = formatoDate(bolsa.notificationDate)

            function difference(date1, date2) {
                const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
                const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
                day = 1000 * 60 * 60 * 24;
                return (date2utc - date1utc) / day
            }

            const dateDifference = difference(actualDate, dateExpire)

            if (dateDifference <= 4 && parametroDate !== verifyNotificationDate) {
                const documento = bolsa.documentoCliente
                bolsa.notificationDate = actualDate
                bolsa.save()
                /**procedemos a notificar si el punto esta por vencer */

                NotificationExpirePuntos(documento , bolsa)
                console.log("Se debe notificar al cliente")
            } else {
                console.log("No se debe notificar al cliente")
            }

        })
        res.status(200).json({
            bolsas
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener las bolsas'
        })
    }



}


const addBolsaPunto = async (req, res = response) => {
    try {

        const clientExist = await Client.findOne({ documento: req.body.documentoCliente })
        if (!clientExist) return res.status(400).json({ msg: 'No existe cliente con el documento proveido' })

        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        //Dios protejenos 
        const bolsa = new bolsaPunto(req.body)

        //guardamos en la db para posteriormente retornar
        bolsa.save()
        
        res.status(200).json({
            bolsa,
            msg: 'Bolsa punto agregado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear la bolsa'
        })
    }

}


const updateBolsaPunto = async (req, res = response) => {
    try {
        const { id } = req.params;

        const bolsa = await bolsaPunto.findByIdAndUpdate(req.body)
        //const client = await Client.findByIdAndUpdate( id, { estado: false } );    
        res.status(200).json({ bolsa, msg: 'Bolsa actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}

const deleteBolsa = async (req, res = response) => {
    try {
        const { id } = req.params;
        const bolsaRemove = await Client.findByIdAndUpdate(id, { status: false })
        //const client = await Client.findByIdAndUpdate( id, { estado: false } );    
        res.status(200).json({ msg: 'Bolsa eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }



}


module.exports = {
    addBolsaPunto,
    updateBolsaPunto,
    deleteBolsa,
    getAllBolsa
}