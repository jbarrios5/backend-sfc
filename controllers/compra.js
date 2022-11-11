const Compra = require("../models/compra");


const getAllCompra = async (req, res) => {
    try {
        const compras = await Compra.find();
        res.status(200).json({ compras })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al momento de obtener todos las compras'
        })
    }

}

const addCompra = async (req, res = response) => {
    try {
        //se agrega todo lo que viene del frontend
        //asumimos que los datos seran validados antes de enviar
        const compra = new Compra(req.body)

        //guardamos en la db para posteriormente retornar
        compra.save()
        //se debe agregar el registro de bolsa de puntos, puede ser por un trigger
        res.status(200).json({
            punto,
            msg: 'Compra agregada exitosamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al crear la compra'
        })
    }

}

const updateCompra = async (req, res = response) => {
    try {
        const { uid } = req.params;
        const compraUpdate = await Compra.findOneAndUpdate({ _id: uid }, req.body)
        res.status(200).json({ msg: 'Compra actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado' + error
        })
    }
}


const deleteCompra = async (req, res = response) => {
    //eliminar bolsa de punto de la compra correspondiente
    try {
        const { uid } = req.params;
        const compraDelete = await Punto.findOneAndUpdate({ _id: uid }, { status: false })
        res.status(200).json({ msg: 'Compra eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error inesperado al eliminar' + error
        })
    }
}



module.exports = {
    getAllCompra,
    addCompra,
    updateCompra,
    deleteCompra,
}