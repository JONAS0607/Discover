// function testeColl() {
// 	alert('Collide ok');
// }


function block_rect(r1, r2) {
	//r1 -> bloqueado
	//r2 -> parede
	//catetos

	var cat_x = r1.center_x() - r2.center_x();
	var cat_y = r1.center_y() - r2.center_y();

	//soma das metades
	var sum_half_width = r1.halfWidth() + r2.halfWidth();
	var sum_half_height = r1.halfHeight() + r2.halfHeight();
	//Avaliando colisão
	if (Math.abs(cat_x) < sum_half_width && Math.abs(cat_y) < sum_half_height) {
		// r2.visible = false;
		// setTimeout(() => {
		// 	if (r2.color == '#92f') {
		// 		setTimeout(() => {
		// 			r2.visible = true;
		// 		}, 1000);
		// 	} else {
		// 		r2.visible = true;
		// 	}
		// }, 1000);
		var over_lap_x = sum_half_width - Math.abs(cat_x);
		var over_lap_y = sum_half_height - Math.abs(cat_y);
		//avaliando lado da colisão
		if (over_lap_x >= over_lap_y) {
			//colisão foi por cima ou por baixo
			if (cat_y > 0) {
				//por cima
				r1.pos_y += over_lap_y;
			} else {
				r1.pos_y -= over_lap_y;

				//por baixo
			}
		} else {
			//colisão foi pelos lados
			if (cat_x > 0) {
				//por esquerda
				r1.pos_x += over_lap_x;
			} else {
				//por direita
				r1.pos_x -= over_lap_x;
				r1.color = '#0f0';

				setTimeout(() => {
					r1.color = '#00f';
				}, 2000);
			}
		}
	}
}