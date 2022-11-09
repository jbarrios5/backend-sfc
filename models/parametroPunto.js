
const { Schema, model } = require('mongoose');

const ParametroPuntoSchema = Schema({
    fechaInicioValidez: {
        type: String,
        required: [true, 'La fecha inicio es obligatoria'],

    },
    fechaFinValidez: {
        type: String,
        required: [true, 'La fecha fin es obligatoria'],

    },
    duracionDias: {
        type: String,
        required: [true, 'La duracion es obligatoria'],

    },
    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
ParametroPuntoSchema.methods.toJSON = function () {
    const { __v, _id, ...parametro } = this.toObject();
    parametro.uid = _id;
    return parametro;
}

module.exports = model('ParametroPunto', ParametroPuntoSchema);
