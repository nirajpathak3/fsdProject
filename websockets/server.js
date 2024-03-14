const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected!');

  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    socket.broadcast.emit('message-broadcast', msg); // Send to all except sender
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
