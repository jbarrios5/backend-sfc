const Regla = require("../models/regla");


const getAllReglas = async (req, res) => {
    try {
        const reglas = await Regla.find({ status: true })
        res.status(200).json({ reglas })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener todas las reglas'
        })
    }

}

const addRegla = async (req, res = response) => {
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const regla = new Regla(req.body)

        //guardamos en la db para posteriormente retornar
        regla.save()

        res.status(200).json({
            regla,
            msg: 'Regla agregada exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear la regla'
        })
    }

}

const updateRegla = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const reglaUpdate = await Regla.findOneAndUpdate({ _id: uid }, req.body)
        res.status(200).json({ msg: 'Regla actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}


const deleteRegla = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const reglaDelete = await Regla.findOneAndUpdate({ _id: uid }, { status: false })
        res.status(200).json({ msg: 'Regla eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al eliminar' + error
        })
    }
}



module.exports = {
    getAllReglas,
    addRegla,
    updateRegla,
    deleteRegla,
}