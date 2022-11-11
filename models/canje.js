
const { Schema, model } = require('mongoose');

const CanjeSchema = Schema({
    documentoCliente: {
        type: String,
        required: [true, 'El id de cliente  es obligatorio']
    },
    monto: {
        type: String,
        required: [true, 'El monto a canjear es obligatorio']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha a canjear es obligatoria'],

    },
    documentoPunto: {
        type: String,
        required: [true, 'El id del punto es obligatorio'],

    },
    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
CanjeSchema.methods.toJSON = function () {
    const { __v, _id, ...canje } = this.toObject();
    canej.uid = _id;
    return canje;
}

module.exports = model('Canje', CanjeSchema);
