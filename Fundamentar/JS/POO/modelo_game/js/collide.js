var gravity_x = 1;
var gravity_y = 1;
var vx = 0;
var vy = 0;

function player_cnv_limit(cnv, player) {
	if (player.x > cnv.width - player.w) {
		player.x = cnv.width - player.w;
	} else {
		gravity_x *= -1;
	}
	if (player.x < 0) {
		player.x = 0;
	} else {
		gravity_x *= -1;
	}
	if (player.y > cnv.height - player.h) {
		player.y = cnv.height - player.h;
	} else {
		gravity_y *= -1;
	}
	if (player.y < 0) {
		player.y = 0;
	} else {
		gravity_y *= -1;
	}
	// player.x += gravity_x;
	// player.y += gravity_y;
}
