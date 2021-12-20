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
