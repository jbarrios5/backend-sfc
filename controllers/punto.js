const Punto = require("../models/punto");


const getAllPuntos = async (req, res) => {
    try {
        const puntos = await Punto.find();
        res.status(200).json({ puntos })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener todos las puntos'
        })
    }

}

const addPunto = async (req, res = response) => {
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const punto = new Punto(req.body)

        //guardamos en la db para posteriormente retornar
        punto.save()

        res.status(200).json({
            punto,
            msg: 'Punto agregada exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear el punto'
        })
    }

}

const updatePunto = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const puntoUpdate = await Punto.findOneAndUpdate({ _id: uid }, req.body)
        res.status(200).json({ msg: 'Punto actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}


const deletePunto = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const puntoDelete = await Punto.findOneAndUpdate({ _id: uid }, { status: false })
        res.status(200).json({ msg: 'Punto eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al eliminar' + error
        })
    }
}



module.exports = {
    getAllPuntos,
    addPunto,
    updatePunto,
    deletePunto,
}