
const { Schema, model } = require('mongoose');

const CanjeSchema = Schema({
    documentoCliente: {
        type: String,
        required: [true, 'El id de cliente  es obligatorio']
    },
    fecha: {
        type: String,
        default:String(new Date())

    },
    premioCanjeado:{
        type:String
    },
    equivalencia: {
        type: Number,
        

    },
    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
CanjeSchema.methods.toJSON = function () {
    const { __v, _id, ...canje } = this.toObject();
    canje.uid = _id;
    return canje;
}

module.exports = model('Canje', CanjeSchema);
