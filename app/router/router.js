const express = require('express');
const router = express.Router();
const person = require('../controllers/person');

// Router of person functions
router.get('/', person.getAllPerson);
router.get('/:id', person.getPersonById);
router.post('/', person.postPerson);
router.put('/:id', person.updatePerson);
router.delete('/:id', person.deletePerson);


// Export the router
module.exports = router;