var LEFT = 65,
	mov_left;
var UP = 87,
	mov_up;
var RIGHT = 68,
	mov_right;
var DOWN = 83,
	mov_down;
var character_information = document.querySelector('h2');
var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');

//criando objeto
var p1 = {
	x: 10,
	y: 10,
};
update();
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

function actions(e, action) {
	var key = e.keyCode;

	if (key === LEFT && key !== RIGHT) mov_left = action;

	if (key === UP && key !== DOWN) mov_up = action;

	if (key === RIGHT && key !== LEFT) mov_right = action;

	if (key === DOWN && key !== UP) mov_down = action;
}

function keyUpHandler(e) {
	actions(e, false);
}

function keyDownHandler(e) {
	// alert(e.keyCode);
	actions(e, true);
}

function movements() {
	if (mov_left) {
		p1.x--;
		character_information.innerHTML = '⬅';
	}
	if (mov_up) {
		p1.y--;
		character_information.innerHTML = '⬆';
	}
	if (mov_right) {
		p1.x++;
		character_information.innerHTML = '➡';
	}
	if (mov_down) {
		p1.y++;
		character_information.innerHTML = '⬇';
	}
}

function update() {
	requestAnimationFrame(update, cnv);
	movements();
	render();
}

function render() {
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.fillRect(p1.x, p1.y, 15, 15);
	ctx.fillRect(50, 50, 50, 50);
}
