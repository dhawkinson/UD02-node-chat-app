'use strict';

// built-in modules
const path       = require('path');
const http       = require('http');

// node_modules
const express    = require('express');
const socketIO   = require('socket.io');

// local modules
const publicPath = path.join(__dirname, '/../public');

// environment variables
const port       = process.env.PORT || 3000;


const app        = express();
const server     = http.createServer(app);
const io         = socketIO(server);        //  web socket server

app.use(express.static(publicPath));

//  listen for an event (in this case a connection)
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    //  listen for event coming from client - message
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
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
