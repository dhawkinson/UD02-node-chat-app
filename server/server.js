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
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath        = path.join(__dirname, '/../public');
const {isRealString}    = require('./utils/validation');
const {Users}           = require('./utils/users');

// environment variables
const port              = process.env.PORT || 3000;

const app               = express();
const server            = http.createServer(app);
const io                = socketIO(server);        //  web socket server
let users               = new Users();

app.use(express.static(publicPath));

//  listen for an event (in this case a connection)
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if ( !isRealString(params.name) || !isRealString(params.room) ) {
            return callback('Name and Room Name are required!');   //  this is an error condition, stop the processing
        }

        socket.join(params.room);
        users.removeUser(socket.id);        //  prevents duplication of users
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();     //  call with no param because that would indicate an error
    });

    //  listen for event coming from client - message
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    //  listen for event coming from client - geolocation
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if ( user ) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
