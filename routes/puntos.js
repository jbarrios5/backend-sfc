const { Router } = require('express');
const { getAllPuntos, addPunto, updatePunto, deletePunto } = require('../controllers/punto');

const router = Router();

//get all rules from db
router.get('/', getAllPuntos)
//add new punto
router.post('/', addPunto)
//update punto
router.put('/:uid', updatePunto)
//to delete punto
router.delete('/:uid', deletePunto)

module.exports = router;