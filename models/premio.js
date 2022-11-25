
const { Schema, model } = require('mongoose');

const PremioSchema = Schema({
    descripcion: {
        type: String,
    },
    equivalencia:{
        type:Number
    },
    status: {
        type: Boolean,
        default: true
    }
});


//uid para que sea mas semantico
PremioSchema.methods.toJSON = function () {
    const { __v, _id, ...premio } = this.toObject();
    premio.uid = _id;
    return premio;
}

module.exports = model('Premio', PremioSchema);
