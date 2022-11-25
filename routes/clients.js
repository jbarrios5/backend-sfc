const { Router } = require('express');
const { addClient, deleteClient, updateClient, getAllClient, getClientByDocumento } = require('../controllers/client');




const router = Router();

//get all clients from db
router.get('/',getAllClient)

//add client
router.post('/',addClient)

//delete a client
router.delete('/:id',deleteClient)

//update a client by document 
router.put('/:documento',updateClient)

router.get('/:documento',getClientByDocumento)


 


module.exports = router;