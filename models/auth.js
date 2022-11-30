
const { Schema, model } = require('mongoose');

const AuthSchema = Schema({
    id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: { type: Number },
    token: { type: String },
    createdat: { type: Date, default: Date.now },
});


//uid para que sea mas semantico
AuthSchema.methods.toJSON = function () {
    const { __v, _id, ...auth } = this.toObject();
    auth.uid = _id;
    return auth;
}

module.exports = model('Auth', AuthSchema);
