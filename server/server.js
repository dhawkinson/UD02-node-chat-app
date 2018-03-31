'use strict';

/*==================================================
    NOTE: this is server side code
==================================================*/

// built-in modules
const path              = require('path');
const http              = require('http');

// node_modules
const express           = require('express');
const socketIO          = require('socket.io');

// local modules
const {generateMessage} = require('./utils/message');
const publicPath        = path.join(__dirname, '/../public');

// environment variables
const port              = process.env.PORT || 3000;


const app               = express();
const server            = http.createServer(app);
const io                = socketIO(server);        //  web socket server

app.use(express.static(publicPath));

//  listen for an event (in this case a connection)
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    //  listen for event coming from client - message
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Ack from server');
;        // socket.broadcast.emit('newMessage', {
        //   from: message.from,
        //   text: message.text,
        //   createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected from server');
    });
});

server.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
