var walls = function (cnv, player) {
	if (player.x < 0) {
		player.x = 0;
	}
	if (player.x + player.w > cnv.width) {
		player.x = cnv.width - player.w;
	}
	if (player.y < 0) {
		player.y = 0;
	}
	if (player.y + player.h > cnv.height) {
		player.y = cnv.height - player.h;
	}
};

function block_rect(r1, r2) {
	var cat_x = r1.center_x() - r2.center_x();
	var cat_y = r1.center_y() - r2.center_y();

	var sum_half_w = r1.half_width() + r2.half_width();
	var sum_half_h = r1.half_height() + r2.half_height();

	if (Math.abs(cat_x) < sum_half_w && Math.abs(cat_y) < sum_half_h) {
		var over_lap_x = sum_half_w - Math.abs(cat_x);
		var over_lap_y = sum_half_h - Math.abs(cat_y);

		if (over_lap_x >= over_lap_y) {
			if (cat_y > 0) {
				r1.y += over_lap_y;
			} else {
				r1.y -= over_lap_y;
			}
		} else {
			if (cat_x > 0) {
				r1.x += over_lap_x;
			} else {
				r1.x -= over_lap_x;
			}
		}
		return 1;
	}
}
function fire_missile(sprites, missiles, player, direction) {
	var missile = new Sprites(
		player.center_x() - 2.5,
		player.center_y() - 2.5,
		5,
		5,
		'#f00',
		'shoot',
	);
	// velocidade do missile
	missile.direction = direction;
	missile.v_l_u = -1;
	missile.v_r_d = +1;
	sprites.push(missile);
	missiles.push(missile);
}

function remove_objetos(object_to_remove, array) {
	var i = array.indexOf(object_to_remove);
	if (i != -1) {
		array.splice(i, 1);
	}
}
