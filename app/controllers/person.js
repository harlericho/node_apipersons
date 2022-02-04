const util = require('util');
const fs = require('fs');
const connectionDb = require('../../config/db');


// * Allows you to wrap the standard Node.js callbacks API to use promises
const query = util.promisify(connectionDb.query).bind(connectionDb);


// * Get all persons
const getAllPerson = async (req, res) => {
    const queryString = 'SELECT * FROM person';
    try {
        const rows = await query(queryString);
        res.status(200).json({ data: rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

// * Get a person by id
const getPersonById = async (req, res) => {
    const personId = req.params.id;
    const queryString = 'SELECT * FROM person WHERE id = ?';
    try {
        const [row] = await query(queryString, [personId]);
        if (typeof row === 'undefined') {
            return res.status(404).json({
                error: 'Person not found'
            });
        }
        res.status(200).json({ data: row });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}
// * Post a person
const postPerson = async (req, res) => {
    // * Get data of a person dni and email
    const dataPersonPost = await validatePersonDniEmailPost(req.body.dni, req.body.email);
    var routeImagen = null; // * default photo value null
    const { dni, names, email, phone } = req.body;
    const queryString = 'INSERT INTO person (dni, names, email, phone, photo) VALUES (?, ?, ?, ?, ?)';
    try {
        // ? Exist data of a person for post
        if (dataPersonPost !== true) {
            if (req.files) {
                const photo = req.files.photo;
                //TODO: add new photo
                routeImagen = Date.now() + "_" + photo.name;
                photo.mv('./uploads/' + routeImagen);
                console.log('=> photo added and uploaded to server', routeImagen); //* message the send to the server
            }
            const rows = await query(queryString, [dni, names, email, phone, routeImagen]);
            if (rows) {
                res.status(201).json({
                    message: 'Person created'
                });
            }

        } else {
            return res.status(400).json({
                error: 'Person already exists'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

// * Update a person
const updatePerson = async (req, res) => {
    // * Get data of a person by dni and email
    const dataPersonUpdate = await validatePersonDniEmailUpdate(req.body.dni, req.body.email, req.params.id);
    const dataPerson = await getOnePerson(req.params.id);
    var routeImagen = null; // * default photo value null
    const personId = req.params.id;
    const { dni, names, email, phone } = req.body;
    const queryString = 'UPDATE person SET dni = ?, names = ?, email = ?, phone = ?, photo = ?  WHERE id = ?';
    try {
        // ? Exist data of a person for update
        if (dataPersonUpdate !== 2) {
            // * Exist data of a person for update
            if (dataPerson !== null) {
                if (req.files) {
                    // * Exist photo in the request files
                    const photo = req.files.photo;
                    //TODO: add new photo
                    routeImagen = Date.now() + "_" + photo.name;
                    if (dataPerson.photo === null) {
                        photo.mv('./uploads/' + routeImagen);
                        console.log('=> photo added and uploaded to server', routeImagen); // * message the send to the server
                    } else {
                        //TODO: delete old photo
                        fs.unlink('uploads/' + dataPerson.photo, (err) => {
                            console.log('=> successfully deleted photo');
                        })
                        photo.mv('./uploads/' + routeImagen);
                        console.log('=> photo added and uploaded to server', routeImagen); // * message the send to the server
                    }
                } else {
                    //TODO: not add new photo
                    routeImagen = dataPerson.photo;
                }
                const rows = await query(queryString, [dni, names, email, phone, routeImagen, personId]);
                if (rows) {
                    res.status(200).json({
                        message: 'Person updated'
                    });
                }
            } else {
                return res.status(404).json({
                    error: 'Person not found'
                });
            }
        } else {
            return res.status(400).json({
                error: 'Person already exists'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

// * Delete a person
const deletePerson = async (req, res) => {
    // * Get data of a person by id
    const dataPerson = await getOnePerson(req.params.id);
    const personId = req.params.id;
    const queryString = 'DELETE FROM person WHERE id = ?';
    try {
        const row = await query(queryString, [personId]);
        if (row.affectedRows !== 0) {
            if (dataPerson.photo !== null) {
                // * Exist photo in the request files
                //TODO: delete old photo
                fs.unlink('uploads/' + dataPerson.photo, (err) => {
                    console.log('=> successfully deleted photo');
                })
            }
            return res.status(404).json({
                error: 'Person not found'
            });
        } else {
            res.status(404).json({
                error: 'Person not found'
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}


// * Function get data a person by id
const getOnePerson = async (dataId) => {
    const queryString = 'SELECT * FROM person WHERE id = ?';
    try {
        const [row] = await query(queryString, [dataId]);
        if (typeof row === 'undefined') {
            return null;
        }
        return row;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// * Function validate if exist a person with dni and email
//TODO: validate post person
const validatePersonDniEmailPost = async (dataDni, dataEmail) => {
    const queryString = 'SELECT * FROM person WHERE dni = ? OR email = ?';
    try {
        const [row] = await query(queryString, [dataDni, dataEmail]);
        if (typeof row === 'undefined') {
            return null;
        }
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// * Function validate if exist a person with dni and email
//TODO: validate update person
const validatePersonDniEmailUpdate = async (dataDni, dataEmail, dataId) => {
    const queryString = 'SELECT COUNT(*) FROM person WHERE dni = ? OR email = ? OR id = ?';
    try {
        const row = await query(queryString, [dataDni, dataEmail, dataId]);
        if (typeof row === 'undefined') {
            return null;
        }
        return row[0]['COUNT(*)'];
    } catch (err) {
        console.log(err);
        return null;
    }
}


// * Export the function
module.exports = {
    getAllPerson,
    getPersonById,
    postPerson,
    updatePerson,
    deletePerson,
}