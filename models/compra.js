
const { Schema, model } = require('mongoose');

const CompraSchema = Schema({
    documentoCliente: {
        type: String,
        required: [true, 'El id de cliente  es obligatorio']
    },
    monto: {
        type: String,
        required: [true, 'El monto a asignar es obligatorio']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha a asignar es obligatoria'],

    },
    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
CompraSchema.methods.toJSON = function () {
    const { __v, _id, ...compra } = this.toObject();
    compra.uid = _id;
    return compra;
}

module.exports = model('Compra', CompraSchema);