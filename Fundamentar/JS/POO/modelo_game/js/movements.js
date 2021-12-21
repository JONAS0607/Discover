var SPACE = 32;
var SPACE_IS_DOWN = false;
var LEFT = 65;
var LEFT_IS_DOWN = false;
var RIGHT = 68;
var RIGHT_IS_DOWN = false;
var SPEED = 3;

function movements(e, status) {
	var key = e.keyCode;
	switch (key) {
		case LEFT:
			LEFT_IS_DOWN = status;
			break;
		case RIGHT:
			RIGHT_IS_DOWN = status;
			break;
		case SPACE:
			SPACE_IS_DOWN = status;
			break;
	}
}

window.addEventListener(
	'keydown',
	function (e) {
		movements(e, true);
	},
	false,
);
window.addEventListener(
	'keyup',
	function (e) {
		movements(e, false);
	},
	false,
);

function player_movement(player) {
	LEFT_IS_DOWN ? (player.x -= SPEED) : RIGHT_IS_DOWN ? (player.x += SPEED) : '';
	if (SPACE_IS_DOWN) {
		player_jump();
	}
}

function player_jump() {}
