var main = document.getElementById('root');

class Veiculo {
	rodas = 4;

	mover(direcao) {
		return (this.direcao = direcao);
	}
	virar(direcao) {
		return (this.direcao = direcao);
	}
}
class Moto extends Veiculo {
	constructor() {
		super(); // puxa atributos e métodos do pai Veiculo
		this.rodas = 2;
	}
}

const honda = new Moto();

let txt = `A moto está indo para ${honda.mover('frente')}`;
txt += ` e virou para a ${honda.virar('ESQUERDA')}`;
main.innerHTML = `${txt}`;
