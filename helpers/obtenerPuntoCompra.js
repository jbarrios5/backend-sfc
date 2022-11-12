const client = require("../models/client");
const regla = require("../models/regla");

const generarPunto = async (monto) => {
    const montoOperacion = Number(monto)
    const reglas = await regla.find();
    let puntoEncontrado = ""
    reglas.forEach( regla => {
        if((montoOperacion >= regla.limitInferior  ) &&  ( montoOperacion <= regla.limitSuperior)){
            puntoEncontrado = regla.equivalencia;
            
        }
    })
    return puntoEncontrado;
}

const obtenerSaldoCliente = async ( documentoCliente ) => {
    const cliente = await client.findOne({documento:documentoCliente})
    return cliente.saldo;

}

module.exports = {
    generarPunto,
    obtenerSaldoCliente
}