const { inherits } = require('util');
const { EventEmitter } = require('events');

function Character(name) {
	this.name = name;
}

inherits(Character, EventEmitter);

const chapolin = new Character('Chapolin');
const dama = new Character('Dama');

chapolin.on('help', () => console.log(`Eu! o ${chapolin.name} colorado!`));
console.log(`${dama.name} say: Oh! E agora, quem poderá me ajudar?`);
setTimeout(() => {
	chapolin.emit('help');
}, 3000);
