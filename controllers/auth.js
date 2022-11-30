const { response } = require('express');
const bcryptjs = require('bcryptjs')
const { v4: uuid } = require('uuid')
const User = require('../models/usuarios');
const Auth = require('../models/auth');


const login = async (req, res = response) => {

    const { email, password } = req.body

    console.log(`Se obtiene los siguientes datos para hacer login `)

    console.log(req.body);

    try {
        const user = await User.findOne({ email })

        console.log("usuario: ", user);

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        console.log("passwrodvalido: ", validPassword)

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        const token = uuid()
        console.log(token);




        const auth = await Auth.create({
            token,
            id_user: user.id_user,
            createdat: new Date()
        })

        console.log(auth);

        delete user.password


        res.status(200).json({
            user,
            token,
            msg: "Login correcto"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    login
}