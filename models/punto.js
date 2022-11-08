
const { Schema, model } = require('mongoose');

const PuntoSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'El codigo del punto es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    puntos: {
        type: String,
        required: [true, 'La cantidad de puntos es obligatoria'],

    },
    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
PuntoSchema.methods.toJSON = function () {
    const { __v, _id, ...punto } = this.toObject();
    punto.uid = _id;
    return punto;
}

module.exports = model('Punto', PuntoSchema);
