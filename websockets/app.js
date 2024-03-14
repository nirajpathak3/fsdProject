// backend/index.js
const express = require('express');
const EventEmitter = require('events');

const app = express();
const emitter = new EventEmitter();

emitter.on('start', () => {
    console.log('Connection initiated!');
});
// emitter.on('message', () => {
//     console.log('Connection initiated!');
// });

app.get('/trigger', (req, res) => {
    emitter.emit('event');
    res.send('Event triggered');
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
