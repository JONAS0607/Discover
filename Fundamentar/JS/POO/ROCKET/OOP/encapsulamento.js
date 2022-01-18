var main = document.getElementById('root');
//definindo classe para os objetos
class Poligono {
	constructor(altura, largura) {
		this.altura = altura;
		this.largura = largura;
	}
	get area() {
		return this.#calcularArea(this.altura, this.largura);
	}
	#calcularArea() {
		return this.altura * this.largura;
	}
}

//criando um objeto
let quadrado = new Poligono(10, 10);
let quadrado2 = new Poligono(100, 100);
let txt = `
quadrado 1: ${quadrado.area} <br>
quadrado 2: ${quadrado2.area} <br>
`;

main.innerHTML = `${txt}`;
