var speed = 9;
var players = [];
var player;
var gravity = 1;

function create_player(array) {
	player = new Sprite(10, 400, 20, 20, '#00f');
	player.vy = 0;
	array.push(player);
	players.push(player);
	return player;
}
function move_player() {
	mv_left
		? (player.x -= speed)
		: mv_up
		? (player.y -= 0)
		: mv_right
		? (player.x += speed)
		: mv_down
		? (player.y += 0)
		: '';
}
function player_jump() {
	player.vy *= -0.5;
	if (player.vy < -15) {
		player.vy = -15;
	}
}

function player_gravity() {
	player.vy += gravity;
	player.y += player.vy;
}
function player_limit(cnv) {
	if (player.y > cnv.height - player.h - 50) {
		player.y = cnv.height - player.h - 50;
		if (space_is_down) {
			player.vy += 25;
			player_jump();
		} else {
			player.vy = 0;
		}
	}
}
