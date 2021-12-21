window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

var SPACE = 32;
var space_is_down = false;

var LEFT = 65;
var mv_left = false;
var UP = 87;
var mv_up = false;
var RIGHT = 68;
var mv_right = false;
var DOWN = 83;
var mv_down = false;

function move(e, status) {
	var key = e.keyCode;
	// console.log(key);
	switch (key) {
		case SPACE:
			space_is_down = status;
			break;
		case LEFT:
			mv_left = status;
			break;
		case UP:
			mv_up = status;
			break;
		case RIGHT:
			mv_right = status;
			break;
		case DOWN:
			mv_down = status;
			break;
	}
}

function keyDownHandler(e) {
	move(e, true);
}
function keyUpHandler(e) {
	move(e, false);
}
