const Canje = require("../models/canje");


const getAllCanje = async (req, res) => {
    try {
        const canjes = await Canje.find();
        res.status(200).json({ canjes })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener todos los canjes'
        })
    }

}

const addCanje = async (req, res = response) => {
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const canje = new Canje(req.body)

        //guardamos en la db para posteriormente retornar
        canje.save()
        //se debe debitos el monto de el registro de bolsa de puntos, puede ser por un trigger
        res.status(200).json({
            punto,
            msg: 'Canje agregada exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear el canje'
        })
    }

}

const updateCanje = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const canjeUpdate = await Canje.findOneAndUpdate({ _id: uid }, req.body)
        res.status(200).json({ msg: 'Canje actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}


const deleteCanje = async (req, res = response) => {
    //eliminar canje correspondiente
    try {
        const { uid } = req.params;
        const canjeDelete = await Punto.findOneAndUpdate({ _id: uid }, { status: false })
        res.status(200).json({ msg: 'Canje eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al eliminar' + error
        })
    }
}



module.exports = {
    getAllCanje,
    addCanje,
    updateCanje,
    deleteCanje,
}