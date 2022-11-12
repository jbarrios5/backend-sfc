
const { Schema, model } = require('mongoose');

const ReglaSchema = Schema({
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    limitInferior: {
        type: Number,
        required: [true, 'El limite inferior es obligatorio'],

    },
    limitSuperior: {
        type: Number,
        required: [true, 'El limite superior es obligatorio'],

    },
    equivalencia: {
        type: String,
        required: [true, 'La equivalencia es obligatoria'],

    },
    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
ReglaSchema.methods.toJSON = function () {
    const { __v, _id, ...regla } = this.toObject();
    regla.uid = _id;
    return regla;
}

module.exports = model('Regla', ReglaSchema);
