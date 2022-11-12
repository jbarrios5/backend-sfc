const { Router } = require('express');
const { addPremio } = require('../controllers/premios');


const router = Router();

//get all rules from db
//router.get('/', getAllPuntos)
//add new punto
router.post('/', addPremio)
//update punto
//router.put('/:uid', updatePunto)
//to delete punto
//router.delete('/:uid', deletePunto)

module.exports = router;