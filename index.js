const app = require('./app/app');
require('./config/db');


// Start the server on port identified in the config file app
app.listen(app.get('port'), (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server on port', app.get('port'));
})