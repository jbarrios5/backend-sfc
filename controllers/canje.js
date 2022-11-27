const bolsaPunto = require("../models/bolsaPunto");
const Canje = require("../models/canje");
const premio = require("../models/premio");
const { notificationCanje } = require("./sendNotification");


const getAllCanje = async (req, res) => {
    try {
        const canjes = await Canje.find();
        res.status(200).json({ canjes })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener todos los canjes'
        })
    }

}

const addCanje = async (req, res = response) => {
    try {
        const { id } = req.params
        const premioEncontrado = await premio.findById(id)

        const documentoCliente = req.body.documentoCliente
        const equivalencia = premioEncontrado.equivalencia
        const premioCanjeado = premioEncontrado.descripcion

        const canje = new Canje({
            documentoCliente,
            equivalencia,
            premioCanjeado
        })

        //guardamos en la db para posteriormente retornar
        canje.save()

        //actualizamos la bolsa de puntos
        let dateVerification = new Date().toJSON();
        const bolsaEncontrada = await bolsaPunto.findOne({ documentoCliente, status: true })

        const vencimineto = new Date(bolsaEncontrada.fechaCaducidadPuntaje)
        const dateToCompare = new Date(dateVerification)

        if (vencimineto >= dateToCompare) {

            console.log('Utilizando los puntos');
            const restaDePuntos = bolsaEncontrada.saldoPuntos - equivalencia

            if (restaDePuntos < 0) {

                const updateUltimo = equivalencia - (restaDePuntos * -1)
                bolsaEncontrada.saldoPuntos = 0
                bolsaEncontrada.status = false
                bolsaEncontrada.ultimoPuntajeUtilizado = updateUltimo
                await bolsaEncontrada.save()
                notificationCanje(bolsaEncontrada.documentoCliente , canje)

                console.log('Utilizando los puntos de la siguiente bolsa');
                const nextBolsa = await bolsaPunto.findOne({ documentoCliente, status: true })
                const nextvencimineto = new Date(bolsaEncontrada.fechaCaducidadPuntaje)
                const nextdateToCompare = new Date(dateVerification)
                const toPositive = restaDePuntos * (-1)

                if (nextvencimineto >= nextdateToCompare) {
                    const nextResta = (nextBolsa.saldoPuntos - toPositive)
                    nextBolsa.ultimoPuntajeUtilizado = toPositive
                    nextBolsa.saldoPuntos = nextResta
                    if (nextBolsa.puntos === 0) nextBolsa.status = false
                    await nextBolsa.save()
                    notificationCanje(nextBolsa.documentoCliente , canje)
                }

            } else {
                bolsaEncontrada.saldoPuntos = bolsaEncontrada.saldoPuntos - equivalencia
                bolsaEncontrada.ultimoPuntajeUtilizado = equivalencia
                if (bolsaEncontrada.saldoPuntos === 0) bolsaEncontrada.status = false
                bolsaEncontrada.save()
                notificationCanje(bolsaEncontrada.documentoCliente , canje)

            }
            console.log('finaliza en usar los puntos');

        } else if (vencimineto < dateToCompare) {

            console.log("Puntos estan caducados");
            bolsaEncontrada.status = false
            await bolsaEncontrada.save()
            console.log('Inhabilitando la bolsa');

            /**se procede a acceder al la siguiente bolsa de puntos */
            const nextBolsa = await bolsaPunto.findOne({ documentoCliente, status: true })
            nextBolsa.saldoPuntos = nextBolsa.saldoPuntos - equivalencia
            nextBolsa.ultimoPuntajeUtilizado = equivalencia

            if (nextBolsa.saldoPuntos === 0) nextBolsa.status = false
            nextBolsa.save()
        }

        //se debe debitos el monto de el registro de bolsa de puntos, puede ser por un trigger
        res.status(200).json({
            canje,
            msg: 'Canje agregada exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear el canje'
        })
    }

}

const updateCanje = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const canjeUpdate = await Canje.findOneAndUpdate({ _id: uid }, req.body)
        res.status(200).json({ msg: 'Canje actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}


const deleteCanje = async (req, res = response) => {
    //eliminar canje correspondiente
    try {
        const { uid } = req.params;
        const canjeDelete = await Punto.findOneAndUpdate({ _id: uid }, { status: false })
        res.status(200).json({ msg: 'Canje eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al eliminar' + error
        })
    }
}



module.exports = {
    getAllCanje,
    addCanje,
    updateCanje,
    deleteCanje,
}