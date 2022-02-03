const express = require('express');
const router = express.Router();
const person = require('../controllers/person');

// Router of person functions
router.get('/', person.getAll);
router.get('/:id', person.getById);
router.post('/', person.post);


// Export the router
module.exports = router;