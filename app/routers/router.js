const express = require('express');
const router = express.Router();
const person = require('../controllers/person');
const { validatePerson } = require('../validators/person');

// Router of person functions
router.get('/', person.getAllPerson);
router.get('/:id', person.getPersonById);
router.post('/', validatePerson, person.postPerson);
router.put('/:id', validatePerson, person.updatePerson);
router.delete('/:id', person.deletePerson);


// Export the router
module.exports = router;