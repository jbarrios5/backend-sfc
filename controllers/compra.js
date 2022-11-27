const { generarPunto, obtenerSaldoCliente } = require("../helpers/obtenerPuntoCompra");
const bolsaPunto = require("../models/bolsaPunto");
const client = require("../models/client");
const Compra = require("../models/compra");


const getAllCompra = async (req, res) => {
    try {
        const compras = await Compra.find();
        res.status(200).json({ compras })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener todos las compras'
        })
    }

}

const addCompra = async (req, res = response) => {
    try {
        const { monto } = req.body
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        /*let saldoCliente = Number(await obtenerSaldoCliente(req.body.documentoCliente))
        console.log(`Obtuvimos el saldo del cliente con valor ${saldoCliente}`);*/



        /*Todo asinga el putno y guardad en bolsa */
        const puntajeAsignado = Number(await generarPunto(monto))
        console.log(`Obtuvimos el punto con valor ${puntajeAsignado}`);

        //saldoCliente = saldoCliente + puntajeAsignado;
        //console.log("Actualizaremos en clientes el campo saldo con valor: "+saldoCliente);
        //const document = req.body.documentoCliente;
        //const updateSaldoCliente = await client.findOneAndUpdate(document,{saldo:Number(saldoCliente)})
        //console.log("Despues de actualizar cliente");
        //console.log(updateSaldoCliente);

        if (puntajeAsignado > 0) {
            const documentoCliente = req.body.documentoCliente;
            const now = new Date();
            const fechaAsignacionPuntaje = String(now)
            console.log(fechaAsignacionPuntaje);
            const numWeeks = 2;
            now.setDate(now.getDate() + numWeeks * 7);
            const fechaCaducidadPuntaje = String(now)
            console.log(fechaCaducidadPuntaje);
            const montoOperacion = Number(req.body.monto)
            const saldoPuntos = puntajeAsignado
            const bolsa = new bolsaPunto({
                documentoCliente,
                fechaAsignacionPuntaje,
                fechaCaducidadPuntaje,
                puntajeAsignado,
                montoOperacion,
                saldoPuntos
            })

            console.log("Tenemos la bolsa vamos a crear");
            console.log(bolsa);
            bolsa.save()//crea la bolsa

            const compra = new Compra(req.body)

            //guardamos en la db para posteriormente retornar
            compra.save()
            //se debe agregar el registro de bolsa de puntos, puede ser por un trigger
            res.status(200).json({
                compra,
                msg: 'Compra agregada exitosamente'
            });
        } else {
            console.log("Error al asignar puntos, no existe regla para el monto ingresado");
            return res.status(400).json({
                msg: 'Error al asignar puntos, no existe regla para el monto ingresado'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear la compra'
        })
    }

}

const updateCompra = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const compraUpdate = await Compra.findOneAndUpdate({ _id: uid }, req.body)
        res.status(200).json({ msg: 'Compra actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}


const deleteCompra = async (req, res = response) => {
    //eliminar bolsa de punto de la compra correspondiente
    try {
        const { uid } = req.params;
        const compraDelete = await Punto.findOneAndUpdate({ _id: uid }, { status: false })
        res.status(200).json({ msg: 'Compra eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al eliminar' + error
        })
    }
}



module.exports = {
    getAllCompra,
    addCompra,
    updateCompra,
    deleteCompra,
}