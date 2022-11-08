const { Router } = require('express');
const { getAllReglas, addRegla, updateRegla, deleteRegla } = require('../controllers/regla');

const router = Router();

//get all rules from db
router.get('/', getAllReglas)
//add new regla
router.post('/', addRegla)
//update regla
router.put('/:uid', updateRegla)
//to delete regla
router.delete('/:uid', deleteRegla)

module.exports = router;