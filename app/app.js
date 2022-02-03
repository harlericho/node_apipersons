const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const router = require('./router/router');
const app = express();

// Port configuration
const port = process.env.PORT || 9000;
app.set('port', port);

// Files configuration
app.use(fileUpload({
    createParentPath: true
}));

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/person/', router);

// Exports the app
module.exports = app;
