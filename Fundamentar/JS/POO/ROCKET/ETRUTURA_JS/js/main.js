//ARRAYS
const root = document.getElementById('root');
let txt = ``;

// Modelando
class Stack {
	constructor() {
		this.data = [];
		this.top = -1;
	}
	push(value) {
		this.top++;
		this.data[this.top] = value;
	}
	pop() {
		if (top < 0) return undefined;
		const poppedTop = this.data[this.top];
		delete this.data[this.top];
		this.top--;
		return poppedTop;
	}
	peek() {
		return this.top >= 0 ? this.data[this.top] : console.log('não há dados');
	}
	size() {
		return this.top + 1;
	}
}

const stack = new Stack();
//adicionar dados
stack.push('aprendendo');
stack.push('dados');

stack.push('estrutura');

console.log(stack.size());
