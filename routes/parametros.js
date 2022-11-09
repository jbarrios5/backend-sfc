const { Router } = require('express');
const { addParametro, updateParametro, deleteParametro, getAllParametro } = require('../controllers/parametroPunto');


const router = Router();

router.get('/',getAllParametro)

//add a new parametro punto
router.post('/', addParametro)

//update 
router.put('/:id', updateParametro)

router.delete('/:id', deleteParametro)


module.exports = router;