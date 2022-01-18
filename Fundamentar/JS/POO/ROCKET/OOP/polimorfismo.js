//Polimorfismo
const root = document.getElementById('root');

class Atleta {
	name;
	peso;
	categoria;
	constructor(name, peso) {
		this.name = name;
		this.peso = peso;
	}

	definirCategoria() {
		if (this.peso <= 50) {
			this.categoria = 'infantil';
		} else if (this.peso <= 65) {
			this.categoria = 'juvenil';
		} else {
			this.categoria = 'adulto';
		}
	}
}

class Lutador extends Atleta {
	definirCategoria() {
		if (this.peso <= 54) {
			this.categoria = 'pluma';
		} else if (this.peso <= 60) {
			this.categoria = 'leve';
		} else if (this.peso <= 75) {
			this.categoria = 'meio-leve';
		} else {
			this.categoria = 'pesado';
		}
	}
}

const joao = new Atleta('João', 90);
const ana = new Atleta('Ana', 55);
const juliana = new Atleta('Juliana', 49);
const jonas = new Lutador('Jonas', 70);

joao.definirCategoria();
ana.definirCategoria();
juliana.definirCategoria();
jonas.definirCategoria();

const competidores = [];
competidores.push(ana);
competidores.push(joao);
competidores.push(juliana);
competidores.push(jonas);

let txt = ``;
for (const i in competidores) {
	txt += `${i} - ${competidores[i].name} ➡ ${competidores[i].categoria}<br> 🔰 Peso : ${competidores[i].peso}<br>`;
}

root.innerHTML = txt;
