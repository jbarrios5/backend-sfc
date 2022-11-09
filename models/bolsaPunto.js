
const { Schema, model } = require('mongoose');

const BolsaPuntoSchema = Schema({
    documentoCliente: {
        type: String,
        required: [true, 'El id  es obligatorio']
    },
    fechaAsignacionPuntaje: {
        type: String,
        required: [true, 'La fecha es obligatoria'],

    },
    fechaCaducidadPuntaje: {
        type: String,
        required: [true, 'La fecha es obligatoria'],

    },
    puntajeAsignado: {
        type: String,
        required: [true, 'El puntaje es obligatorio'],

    },
    puntajeUtilizado: {
        type: String,

    },
    saldoPuntos: {
        type: String,

    },
    montoOperacion: {
        type: String,

    },

    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
BolsaPuntoSchema.methods.toJSON = function () {
    const { __v, _id, ...punto } = this.toObject();
    punto.uid = _id;
    return punto;
}

module.exports = model('BolsaPunto', BolsaPuntoSchema);
