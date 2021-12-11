var LEFT = 37,
	UP = 38,
	RIGHT = 39,
	DOWN = 40,
	SIZE = 50,
	pos_X = 1,
	pos_Y = 1,
	objColor = '#00f';

var mov_left = (mov_up = mov_right = mov_down = false);

function updateBlock(a, b) {
	if (mov_left) {
		pos_X -= a;
	}
	if (mov_right) {
		pos_X += b;
	}
	if (mov_up) {
		pos_Y -= a;
	}
	if (mov_down) {
		pos_Y += b;
	}
}
function collision() {
	if (
		pos_X + SIZE > block_x &&
		pos_X < block_x + SIZE &&
		pos_Y + SIZE > block_Y &&
		pos_Y < block_Y + SIZE
	) {
		// alert('bateu no bloco!');
		updateBlock(-1, -1);

		objColor = '#f00';
	} else {
		objColor = '#00f';
	}
}
var cnv = document.querySelector('canvas');

var block_x = cnv.width / 2 - SIZE / 2;
var block_Y = cnv.height / 2 - SIZE / 2;

var ctx = cnv.getContext('2d');

// método para ouvir a interação do usuário
window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

function movements(e, action) {
	var key = e.keyCode;
	switch (key) {
		case UP:
			mov_up = action;
			break;
		case DOWN:
			mov_down = action;
			break;
		case LEFT:
			mov_left = action;
			break;
		case RIGHT:
			mov_right = action;
			break;
	}
}

function keyDownHandler(e) {
	movements(e, true);
}
function keyUpHandler(e) {
	movements(e, false);
}
//------------------//

function update() {
	updateBlock(1, 1);
	collision();
}
function draw() {
	//---------- bloco azul
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.fillStyle = '#000';
	ctx.fillRect(block_x, block_Y, SIZE, SIZE);
	ctx.fillStyle = objColor;
	ctx.fillRect(pos_X, pos_Y, SIZE, SIZE);
	//----------bloco preto
}
function loop() {
	window.requestAnimationFrame(loop, cnv);
	update();
	draw();
}

loop();
