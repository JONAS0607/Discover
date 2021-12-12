var LEFT = 37,
	UP = 38,
	DOWN = 40,
	RIGHT = 39,
	PG_UP = 33,
	PG_DOWN = 34;
var mv_left = false,
	mv_right = false,
	mv_up = false,
	mv_down = false,
	zoom_in = false,
	zoom_out = false;
var speed = 2;

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
window.addEventListener('keyup', keyUpHandler, false);

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
	src_y = value_x_y;
	if (size > 70 && size <= 220) {
		let cont = 220 - size;
		cont /= 15;
		src_y > limite
			? ((src_y = limite + plus + 15 * cont), mapaInfo('erro'))
			: mapaInfo('normal');
	} else {
		src_y > 570 ? ((src_y = 594), mapaInfo('erro')) : mapaInfo('normal');
	}
}
function limiteMapaRight(value_x_y, limite, plus) {
	src_x = value_x_y;
	if (size > 70 && size <= 220) {
		let cont = 220 - size;
		cont /= 15;
		src_x > limite
			? ((src_x = limite + plus + cont * 15), mapaInfo('erro'))
			: mapaInfo('normal');
	} else {
		src_x > 575 ? ((src_x = 600), mapaInfo('erro')) : mapaInfo('normal');
	}
}
function movements(e, status) {
	var key = e.keyCode;

	switch (key) {
		case LEFT:
			mv_left = status;

			break;
		case RIGHT:
			mv_right = status;

			break;
		case UP:
			mv_up = status;

			break;
		case DOWN:
			mv_down = status;

			break;
		case PG_DOWN:
			zoom_out = status;

			break;
		case PG_UP:
			zoom_in = status;

			break;
	}
}

function keyDownHandler(e) {
	movements(e, true);
}
function keyUpHandler(e) {
	movements(e, false);
}

function render() {
	// ctx.fillRect(0, 0, cnv.width, cnv.height);
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.drawImage(mapa, src_x, src_y, size, size, 0, 0, cnv.width, cnv.height);
}

function update() {
	if (mv_left) {
		src_x -= speed;
		src_x < 25 ? ((src_x = 0), mapaInfo('erro')) : mapaInfo('normal');
	}
	if (mv_right) {
		src_x += speed;
		limiteMapaRight(src_x, 400, 50);
	}
	if (mv_up) {
		src_y -= speed;
		src_y < 25 ? ((src_y = 0), mapaInfo('erro')) : mapaInfo('normal');
	}
	if (mv_down) {
		src_y += speed;
		limiteMapaDown(src_y, 400, 30);
	}
	if (zoom_in) {
		size -= speed;
		size < 70
			? ((size = 70), mapaInfo('erro', 'aproxima'))
			: mapaInfo('normal');
		// console.log(`SIZE -> ${size}`);
	}
	if (zoom_out) {
		size += speed;
		size > 220
			? ((size = 220), mapaInfo('erro', 'expande'))
			: mapaInfo('normal');
		// console.log(`SIZE -> ${size}`);
	}
}

function loop() {
	requestAnimationFrame(loop, cnv);
	update();
	render();
}
