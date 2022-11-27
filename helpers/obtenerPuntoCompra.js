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

module.exports = {
    generarPunto,
    obtenerSaldoCliente
}