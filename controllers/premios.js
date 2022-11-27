const premio = require("../models/premio");

const getAllPremios = async (req, res) => {
    try {
        const premios = await premio.find({ status: true });
        res.status(200).json({ premios })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al obtener todos los premios'
        })
    }
}

const addPremio = async (req, res) => {
    console.log(req.body);
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const premios = new premio(req.body)
        //guardamos en la db para posteriormente retornar
        premios.save()

        res.status(200).json({
            premios,
            msg: 'Premio agregado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al agregar un premio'
        })
    }
}

const deletePremio = async (req, res) => {
    try {
        const { uid } = req.params;
        const premioDelete = await premio.findOneAndUpdate({ _id: uid }, { status: false })
        res.status(200).json({ msg: 'Premio eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}

const updatePremio = async (req, res) => {
    try {
        const { uid } = req.params;
        const premioUpdate = await premio.findOneAndUpdate({ _id: uid }, req.body)
        res.status(200).json({ msg: 'Premio actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }

}

module.exports = {
    addPremio,
    getAllPremios,
    deletePremio,
    updatePremio
}