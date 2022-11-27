const { Router } = require('express');
const { addPremio, getAllPremios, deletePremio, updatePremio } = require('../controllers/premios');


const router = Router();


router.post('/', addPremio)
router.get('/', getAllPremios)
router.put('/:uid', updatePremio)
//to delete premio
router.delete('/:uid', deletePremio)


module.exports = router;