'use strict';

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const jsonserver = require('json-server');
const dbjson = require('./db.json');

//web server config
let web = {};
web.hostname = process.env.HOSTNAME || 'localhost';
web.port = process.env.PORT || 8000;
web.directory = `${__dirname}/../../build`;
if(process.env.NODE_ENV === 'production'){
  web.directory = `${__dirname}/../../dist`;
}

// web server configuration
let app = express();
let server = http.createServer(app);
let ioOptions = {
  serveClient:true //exposes client-side JS library
};
let io = socketio(server, ioOptions);

// serve up static files
app.use(express.static(web.directory));

// mock json server
app.use(jsonserver.defaults());
app.use('/mock', jsonserver.router(dbjson));

let webserver = server.listen(web.port, web.address, null, () => {
  let msg = `Web server running at http://${webserver.address().address}:${webserver.address().port}`;
  msg += `\nWeb directory: ${web.directory}`;
  console.log(msg);
});

// socket.io
io.on('connection', (socket) => {
  console.log(`New Websocket Connection! ${socket.id}`);

  socket.on('handshake', (msg) => {
    console.log(`${msg.username} registered to ${socket.id}`);
    socket.emit('handshake', `Welcome to MeaningfulJS ${msg.username}`);
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnect');
  });
});
