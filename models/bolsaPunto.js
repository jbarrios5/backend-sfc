
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
        type: Number,
        required: [true, 'El puntaje es obligatorio'],

    },
    ultimoPuntajeUtilizado: {
        type: Number,
        default:0

    },
    saldoPuntos: {
        type: Number,

    },
    montoOperacion: {
        type: Number,

    },
    status: {
        type: Boolean,
        default: true
    },
    notificationDate:{
        type: Date,
        default:String(new Date())
    }
});


//uid para que sea mas semantico
BolsaPuntoSchema.methods.toJSON = function () {
    const { __v, _id, ...punto } = this.toObject();
    punto.uid = _id;
    return punto;
}

module.exports = model('BolsaPunto', BolsaPuntoSchema);
