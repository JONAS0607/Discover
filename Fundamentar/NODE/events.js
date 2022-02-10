const { EventEmitter } = require('events');

const ev = new EventEmitter();

// console.log(ev);
ev.once('saySomething', (author) => console.log('Eu ouvi você ' + author));
// ev.on('saySomething', (author) => console.log('Eu ouvi você ' + author));
ev.emit('saySomething', 'Jonas');
ev.emit('saySomething', 'Nicolle');
ev.emit('saySomething', 'Sabrina');
