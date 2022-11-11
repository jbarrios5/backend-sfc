const { Router } = require('express');
const { getAllCompra, addCompra, updateCompra, deleteCompra } = require('../controllers/compra');

const router = Router();

//get all rules from db
router.get('/', getAllCompra)
//add new punto
router.post('/', addCompra)
//update punto
router.put('/:uid', updateCompra)
//to delete punto
router.delete('/:uid', deleteCompra)

module.exports = router;