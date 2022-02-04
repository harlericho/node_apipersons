const { check } = require('express-validator');
const { validateHelperFields } = require('../helpers/validateHelper');

// * Validator for the fields of the person model
const validatePerson = [
    //TODO: add validations for the fields on route /api/person/
    check('dni')
        .exists()
        .not()
        .isEmpty()
        .withMessage('DNI is required')
        .isLength({ min: 10, max: 10 })
        .withMessage('The dni must be 10 characters long')
        .matches(/^[0-9]+$/),
    check('names')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Names is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('The names must be between 3 and 100 characters long'),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('The email is not valid'),
    check('phone')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Phone is required')
        .isNumeric()
        .withMessage('The phone must be numeric')
        .isLength({ min: 10, max: 10 })
        .withMessage('The phone must be 10 characters long'),
    (req, res, next) => {
        validateHelperFields(req, res, next);
    }
]

// * Export module validatePerson
module.exports = {
    validatePerson
}