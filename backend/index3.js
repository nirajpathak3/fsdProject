const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io'); // Using socket.io for convenience

const io = new Server(http);

app.use(express.static('public')); // Serve static files from the 'public' directory

const users = {}; // Store connected users and their usernames

io.on('connection', (socket) => {
  console.log('A user connected!');

  socket.on('join', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('userJoined', username); // Broadcast to all except sender
    io.emit('usersList', Object.values(users)); // Send current user list to all
  });

  socket.on('chat message', (msg) => {
    const username = users[socket.id];
    io.emit('chat message', { username, msg }); // Broadcast message to all
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit('userLeft', username); // Broadcast user leaving
  });
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
