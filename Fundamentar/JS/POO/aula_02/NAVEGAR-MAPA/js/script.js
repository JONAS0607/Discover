var LEFT = 37,
	UP = 38,
	DOWN = 40,
	RIGHT = 39,
	PG_UP = 33,
	PG_DOWN = 34;

var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');
// variaveis para movimentação do mapa
var src_x = 0;
var src_y = 0;
var size = 70;

function msg(type, msg) {
	info.innerHTML = `
  <div class='${type}'>
  <h1>INFORMAÇÕES</h1>
  <p>${msg}</p> 
  </div>
  `;
}

var info = document.querySelector('.information');
//criando objeto
var mapa = new Image();
mapa.src = './images/map.png';

mapa.onload = loop();

window.addEventListener('keydown', keyDownHandler, false);
// window.addEventListener('keyup', keyUpHandler, false);

function mapaInfo(status, complemento = null) {
	if (status == 'erro') {
		if (complemento != null) {
			return msg(`${status}`, `mapa não ${complemento} mais`);
		} else {
			return msg(`${status}`, `mapa terminou`);
		}
	} else {
		return msg(`${status}`, `mapa ${status}`);
	}
}
function limiteMapaDown(value_x_y, limite, plus) {
	src_y += value_x_y;
	if (size > 70 && size <= 220) {
		let cont = 220 - size;
		cont /= 15;
		console.log(`contador ${cont}`);
		src_y > limite
			? ((src_y = limite + plus + 15 * cont), mapaInfo('erro'))
			: mapaInfo('normal');
	} else {
		src_y > 570 ? ((src_y = 594), mapaInfo('erro')) : mapaInfo('normal');
	}
}
function limiteMapaRight(value_x_y, limite, plus) {
	src_x += value_x_y;
	if (size > 70 && size <= 220) {
		console.log(`SIZE - X : ${size}`);
		let cont = 220 - size;
		cont /= 15;
		console.log(`contador ${cont}`);
		src_x > limite
			? ((src_x = limite + plus + cont * 15), mapaInfo('erro'))
			: mapaInfo('normal');
	} else {
		src_x > 575 ? ((src_x = 600), mapaInfo('erro')) : mapaInfo('normal');
	}

	console.log(`srcRight : ${src_x}`);
}
function moviments(e, value_x_y, value_up_down) {
	var key = e.keyCode;

	switch (key) {
		case LEFT:
			src_x -= value_x_y;
			// console.log(`srcLeft : ${src_x}`);
			src_x < 25 ? ((src_x = 0), mapaInfo('erro')) : mapaInfo('normal');

			break;
		case RIGHT:
			limiteMapaRight(value_x_y, 400, 50);
			break;
		case UP:
			src_y -= value_x_y;
			// console.log(`srcUp : ${src_y}`);
			src_y < 25 ? ((src_y = 0), mapaInfo('erro')) : mapaInfo('normal');

			break;
		case DOWN:
			limiteMapaDown(value_up_down, 400, 30);

			break;
		case PG_DOWN:
			// limiteMapaRight(value_x_y, 400, 50);
			// limiteMapaDown(value_x_y, 400, 30);
			size += value_up_down;
			size > 220
				? ((size = 220), mapaInfo('erro', 'expande'))
				: mapaInfo('normal');
			// console.log(`SIZE -> ${size}`);

			break;
		case PG_UP:
			size -= value_up_down;
			size < 70
				? ((size = 70), mapaInfo('erro', 'aproxima'))
				: mapaInfo('normal');
			// console.log(`SIZE -> ${size}`);
			break;
	}
}

function keyDownHandler(e) {
	moviments(e, 25, 15);
}

function render() {
	// ctx.fillRect(0, 0, cnv.width, cnv.height);
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.drawImage(mapa, src_x, src_y, size, size, 0, 0, cnv.width, cnv.height);
}

function update() {}

function loop() {
	requestAnimationFrame(loop, cnv);
	render();
}
