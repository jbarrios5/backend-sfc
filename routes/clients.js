const { Router } = require('express');
const { addClient } = require('../controllers/client');




const router = Router();

//add client
router.post('/',addClient)




module.exports = router;