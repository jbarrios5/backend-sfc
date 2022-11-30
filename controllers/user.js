const User = require("../models/usuarios");
const bcryptjs = require('bcryptjs')



const createUser = async (req, res) => {

    const { password } = req.body

    console.log(`Se obtiene los siguientes datos para insertar el user `)
    console.log(req.body)

    try {


        const salt = bcryptjs.genSaltSync();
        req.body.password = bcryptjs.hashSync(password, salt);


        const user = new User(req.body);
        await user.save();
        res.status(200).json({
            user,
            msg: "Usuario creado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrio un error inesperado al crear un usuario"
        });
    }
}


module.exports = {
    createUser
};