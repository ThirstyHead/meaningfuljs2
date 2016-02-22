'use strict';

let config = require('../../gulpfile-config');
let express = require('express');
let jsonserver = require('json-server');
let dbjson = require('./db.json');

//web server config
let web = {};
web.hostname = process.env.HOSTNAME || config.web.hostname || 'localhost';
web.port = process.env.PORT || config.web.port || 8000;
web.directory = `${__dirname}/../../${config.dir.build}`;

// web server configuration
let app = express();
app.use(express.static(web.directory));

// mock json server
app.use(jsonserver.defaults());
app.use('/mock', jsonserver.router(dbjson));

let server = app.listen(web.port, web.address, null, () => {
    let msg = `Web server running at http://${server.address().address}:${server.address().port}`;
    msg += `\nWeb directory: ${web.directory}`;
    console.log(msg);
});
