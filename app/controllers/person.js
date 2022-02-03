const util = require('util');
const connectionDb = require('../../config/db');


// Allows you to wrap the standard Node.js callbacks API to use promises
const query = util.promisify(connectionDb.query).bind(connectionDb);


// Get all persons
async function getAll(req, res) {
    const queryString = 'SELECT * FROM person';
    try {
        const rows = await query(queryString);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

// Get a person by id
async function getById(req, res) {
    const personId = req.params.id;
    const queryString = 'SELECT * FROM person WHERE id = ?';
    try {
        const [rows] = await query(queryString, [personId]);
        if (typeof rows === 'undefined') {
            return res.status(404).json({
                error: 'Person not found'
            });
        }
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}
// Post a person
async function post(req, res) {
    const { dni, names, email, phone } = req.body;
    const queryString = 'INSERT INTO person (dni, names, email, phone, photo) VALUES (?, ?, ?, ?, ?)';
    try {
        if (req.files) {
            let photo = req.files.photo;
            routeImagen = Date.now() + "_" + photo.name;
            photo.mv('./uploads/' + routeImagen);
        }else{
            routeImagen = null;
        }
        const [rows] = await query(queryString, [dni, names, email, phone, routeImagen]);
        console.log(rows);
        res.status(201).json({
            message: 'Person created'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}







// Export the function
module.exports = {
    getAll,
    getById,
    post,
}