const { validationResult } = require('express-validator');

// * Validator for the field on route /api/person/
const validateHelperFields = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403).json({
            error: error.mapped()
        });
    }
}

// * Export module validateHelperFields
module.exports = {
    validateHelperFields
}