const { Router } = require('express');
const { getAllCanje, addCanje, updateCanje, deleteCanje } = require('../controllers/canje');

const router = Router();

//get all rules from db
router.get('/', getAllCanje)
//add new punto
router.post('/', addCanje)
//update punto
router.put('/:uid', updateCanje)
//to delete punto
router.delete('/:uid', deleteCanje)

module.exports = router;