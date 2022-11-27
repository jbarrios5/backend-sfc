const client = require("../models/client");
const regla = require("../models/regla");

const generarPunto = async (monto) => {
    console.log("Comenzamos a generar el punto");
    const montoOperacion = Number(monto)
    const reglas = await regla.find({ status: true });
    let lastElement = reglas[reglas.length - 1];
    let puntoEncontrado = ""

    reglas.forEach((regla, index) => {

        if (montoOperacion > regla.limitInferior && montoOperacion <= regla.limitSuperior) {
            puntoEncontrado = regla.equivalencia;
        }
    })
    console.log("Finalizamos la generación de puntos");
    return puntoEncontrado;

}

const obtenerSaldoCliente = async (documentoCliente) => {
    const cliente = await client.findOne({ documento: documentoCliente })
    return cliente.saldo;

}

const obtenerEmailCliente = async (documentoCliente) => {
    const cliente = await client.findOne({ documento: documentoCliente })
    return cliente.correo;
}

const formatoDate = (fecha) => {

    if (fecha != null) {
        const date = new Date(fecha)
        const dateFormat = date.getDate().toString().padStart(2, '0') + '/' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
            date.getFullYear()

        return dateFormat.toString()

    }
    return null


}


module.exports = {
    generarPunto,
    obtenerSaldoCliente,
    formatoDate,
    obtenerEmailCliente
}