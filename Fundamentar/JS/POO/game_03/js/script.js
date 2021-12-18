window.onload = function () {
	const cnv = document.getElementById('canvas');
	const ctx = cnv.getContext('2d');
	//-------------------VARIÁVEIS
	// GRAVITY
	var gravity = 1;
	var gravity_y = 1;

	//-------------
	//FIM TESTE MOVIMENTO
	//MOVIMENTO
	var speed = 2;
	var LEFT = 65,
		UP = 87,
		RIGHT = 68,
		DOWN = 83;
	var mv_left = false,
		mv_up = false,
		mv_right = false,
		mv_down = false;
	//FIM MOVIMENTO
	//VARIÁVEIS DE COLISÃO
	var SPACE = 32;
	var arrow_left = 37;
	var arrow_up = 38;
	var arrow_right = 39;
	var arrow_down = 40;

	var arrow_left_is_down = false;
	var arrow_up_is_down = false;
	var arrow_right_is_down = false;
	var arrow_down_is_down = false;

	var direction = 0;
	var space_is_down = false;
	var shoot = false;
	//FIM VARIÁVEIS DE COLISÃO
	//-------------------FIM VARIÁVEIS

	//---------------------------JOGADORES
	var sprites = [];
	var missiles = [];
	var player = new Sprites(10, 420, 20, 20, '#00f', 'player');
	var skeleton = new Sprites(10, 300, 200, 20, '#f00', 'skeleton');
	skeleton.vetor_deslocamento_x = 0;
	skeleton.vetor_deslocamento_y = 0;
	//---------------------------Adiciona jogador no array
	sprites.push(player);
	sprites.push(skeleton);
	//---------------------------Fim Adiciona jogador no array
	//---------------------------FIM - JOGADORES
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}
	window.addEventListener('keydown', keyDownHandler, false);
	window.addEventListener('keyup', keyUpHandler, false);

	function movements(e, status) {
		function is_key(l, u, r, d) {
			mv_left = l;
			mv_up = u;
			mv_right = r;
			mv_down = d;
		}
		var key = e.keyCode;
		// console.log(key);
		key == LEFT
			? is_key(status, false, false, false)
			: key == UP
			? is_key(false, status, false, false)
			: key == RIGHT
			? is_key(false, false, status, false)
			: key == DOWN
			? is_key(false, false, false, status)
			: '';
		//--------FAZ O DISPARO
		// key == SPACE
		// 	? !space_is_down
		// 		? ((shoot = true), (space_is_down = true))
		// 		: (space_is_down = false)
		// 	: '';
		function chose_arrow(arrow) {
			!arrow ? ((shoot = true), (arrow = true)) : (arrow = false);
		}

		key == arrow_left
			? (chose_arrow(arrow_left_is_down), (direction = arrow_left))
			: '';
		key == arrow_up
			? (chose_arrow(arrow_up_is_down), (direction = arrow_up))
			: '';
		key == arrow_right
			? (chose_arrow(arrow_right_is_down), (direction = arrow_right))
			: '';
		key == arrow_down
			? (chose_arrow(arrow_down_is_down), (direction = arrow_down))
			: '';

		//--------------------
	}

	function keyDownHandler(e) {
		movements(e, true);
	}
	function keyUpHandler(e) {
		movements(e, false);
	}

	function update() {
		mv_left
			? (player.x -= speed)
			: mv_up
			? (player.y -= speed)
			: mv_right
			? (player.x += speed)
			: mv_down
			? (player.y += speed)
			: '';
		//----------EXERCE FORÇA DE GRAVIDADE
		if (skeleton.visible) {
			skeleton.vetor_deslocamento_x += gravity;
			skeleton.x = skeleton.vetor_deslocamento_x;
			skeleton.vetor_deslocamento_y += gravity_y;
			skeleton.y = skeleton.vetor_deslocamento_y;
		} else {
			skeleton.vetor_deslocamento_x = 0;
			skeleton.vetor_deslocamento_y = 0;
		}

		//----------SKELETON QUICA NA PAREDE

		if (skeleton.x + skeleton.w > cnv.width || skeleton.x < 0) {
			if (skeleton.x < 0) {
				skeleton.x = 0;
				gravity *= -1;
			} else {
				skeleton.x = cnv.width - skeleton.w;
				gravity *= -1;
			}
		}
		if (skeleton.y + skeleton.h > cnv.height || skeleton.y < 0) {
			if (skeleton.y < 0) {
				skeleton.y = 0;
				gravity_y *= -1;
			} else {
				skeleton.y = cnv.height - skeleton.h;
				gravity_y *= -1;
			}
		}

		//----------FIM SKELETON QUICA NA PAREDE
		//----------------------------------
		//----------MOVIMENTA O SHOOT
		for (var i in missiles) {
			function remove() {
				remove_objetos(missile, missiles);
				remove_objetos(missile, sprites);
				i--;
			}

			var missile = missiles[i];

			missile.direction == arrow_left
				? (missile.x += missile.v_l_u)
				: missile.direction == arrow_up
				? (missile.y += missile.v_l_u)
				: missile.direction == arrow_right
				? (missile.x += missile.v_r_d)
				: missile.direction == arrow_down
				? (missile.y += missile.v_r_d)
				: '';
			block_rect(skeleton, missile);
			if (missile.y < -missile.h) {
				remove();
			}
		}
		//----------FIM DO MOVIMENTO DO SHOOT
		//---------------- Cria o SHOOT

		if (shoot) {
			fire_missile(sprites, missiles, player, direction);
			shoot = false;
			// console.log(direction);
		}
		//----------------FIM SHOOT

		walls(cnv, player);
		// walls(cnv, skeleton);
		block_rect(skeleton, player);
	}

	function render() {
		ctx.save();
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (var i in sprites) {
			var spr = sprites[i];
			ctx.fillStyle = spr.color;
			var msg_measure = ctx.measureText(spr.name).width;
			msg_measure = Math.floor(msg_measure);

			if (spr.name != 'shoot') {
				message(
					ctx,
					`${spr.name} `,
					spr.center_x() - msg_measure * 0.6,
					spr.center_y() - spr.half_height() - 25,
					10,
					'#fff',
					'#000',
				);
			}

			spr.visible ? ctx.fillRect(spr.x, spr.y, spr.w, spr.h) : '';
			// ctx.fillText(
			// 	`${spr.name}`,
			// 	spr.center_x() - spr.half_width(),
			// 	spr.center_y() - spr.half_height() - 5,
			// );
		}
		ctx.restore();
		// message(ctx, `player p_x : ${player.x}`, 1, 1, 20, '#fff', '#000');
		// message(ctx, `player p_y : ${player.y}`, 1, 22, 20, '#fff', '#000');
		// message(ctx, `cnv w : ${cnv.width}`, 1, 43, 20, '#fff', '#000');
		message(ctx, `gravity : ${gravity}`, 1, 64, 20, '#fff', '#000');
		message(ctx, `gravity _y : ${gravity_y}`, 1, 44, 20, '#fff', '#000');

		message(
			ctx,
			`skeleton vx : ${Math.floor(skeleton.vetor_deslocamento_x)}`,
			1,
			85,
			20,
			'#000',
			'#f00',
		);
		message(
			ctx,
			`skeleton vy : ${Math.floor(skeleton.vetor_deslocamento_y)}`,
			1,
			105,
			20,
			'#000',
			'#f00',
		);
		message(
			ctx,
			`skeleton x : ${Math.floor(skeleton.x)}`,
			1,
			125,
			20,
			'#fff',
			'#00f',
		);
		message(
			ctx,
			`skeleton y : ${Math.floor(skeleton.y)}`,
			1,
			146,
			20,
			'#000',
			'#0f0',
		);
	}
	loop();
};
