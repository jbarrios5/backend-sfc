
const { Schema, model } = require('mongoose');

const ClientSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        
    },
    tipoDocumento: {
        type: String,
        required: [true, 'El tipo de documento es obligatorio'],
    },
    documento: {
        type: String,
        required: [true, 'El documento es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
    },
    telefono: {
        type: String,
    },
    nacionalidad: {
        type: String,
    },
    fechaNacimiento: {
        type: String,

    },
    status:{
        type:Boolean,
        default:true

    }
});


//uid para que sea mas semantico
ClientSchema.methods.toJSON = function() {
    const { __v,_id, ...client  } = this.toObject();
    client.uid = _id;
    return client;
}

module.exports = model( 'Client', ClientSchema );
