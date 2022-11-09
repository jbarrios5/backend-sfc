const { Router } = require('express');
const { addBolsaPunto, updateBolsaPunto, deleteBolsa, getAllBolsa } = require('../controllers/bolsaPunto');


const router = Router();

router.get('/',getAllBolsa)

//add a new bolsa punto
router.post('/', addBolsaPunto)

//update 
router.put('/:id', updateBolsaPunto)

router.delete('/:id', deleteBolsa)


module.exports = router;