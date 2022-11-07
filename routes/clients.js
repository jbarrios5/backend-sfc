const { Router } = require('express');
const { addClient, deleteClient, updateClient, getAllClient } = require('../controllers/client');




const router = Router();

//get all clients from db
router.get('/',getAllClient)

//add client
router.post('/',addClient)

//delete a client
router.delete('/:documento',deleteClient)

//update a client by document 
router.put('/:documento',updateClient)


 


module.exports = router;