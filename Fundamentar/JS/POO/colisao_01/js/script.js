window.onload = function () {
	const cnv = document.getElementById('canvas');
	const ctx = cnv.getContext('2d');
	//-------------------variáveis
	//------------------- Numero random
	function n_random(max, min) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	//----------Gravidade
	var gravity = 0.1;
	//----------Fim Gravidade
	//----Movimentos
	var LEFT = 65,
		UP = 87,
		RIGHT = 68,
		DOWN = 83,
		SPACE = 32;
	var mv_left = (mv_up = mv_right = mv_down = false);
	var shoot = (space_is_down = false);

	//--------------
	//------ ARRAYS
	var sprites = [];
	var enemies = [];
	var missiles = [];
	//-------------
	//------ OBJETOS
	var player = new Sprite(0, 290, 10, 10, '#00f');
	player.speed = 4;
	var skeleton = new Sprite(
		n_random(200, 100),
		n_random(200, 150),
		n_random(40, 30),
		n_random(30, 20),
		'#f00',
	);
	// skeleton.vetor_deslocamento_x = Math.floor(Math.random() * 10) + 1;
	skeleton.vetor_deslocamento_x = 1;
	skeleton.vetor_deslocamento_y = 0;
	var award = new Sprite(
		n_random(200, 100),
		n_random(150, 100),
		n_random(40, 30),
		n_random(30, 20),
		'#ff0',
	);
	sprites.push(player);
	sprites.push(skeleton);
	enemies.push(skeleton);
	sprites.push(award);
	enemies.push(award);
	//--------------
	//----------------------------
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}
	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup', keyUpHandler, false);
	function movements(e, status) {
		function move(l, u, r, d, s) {
			mv_left = l;
			mv_up = u;
			mv_right = r;
			mv_down = d;
			space_is_down = s;
		}

		var key = e.keyCode;
		key == LEFT
			? move(status, false, false, false)
			: key == UP
			? move(false, status, false, false)
			: key == RIGHT
			? move(false, false, status, false)
			: key == DOWN
			? move(false, false, false, status)
			: key == SPACE
			? !space_is_down
				? ((shoot = true), (space_is_down = true))
				: (space_is_down = false)
			: '';
	}
	function keyUpHandler(e) {
		movements(e, false);
		console.log(e.keyCode);
	}
	function keyDownHandler(e) {
		movements(e, true);
	}

	function update() {
		//------------------------------MOVIMENTOS DO CHAR
		mv_left
			? (player.x -= player.speed)
			: mv_up
			? (player.y -= player.speed)
			: mv_right
			? (player.x += player.speed)
			: mv_down
			? (player.y += player.speed)
			: '';
		//-------------------------------LIMITES DA TELA PARA PLAYER
		player.x = Math.max(0, Math.min(cnv.width - player.w, player.x));
		player.y = Math.max(0, Math.min(cnv.height - player.h, player.y));
		//----------------------------------------------
		//-------------------------------COLISÕES
		for (var i in enemies) {
			var blk = enemies[i];
			if (blk.visible) {
				// console.log(blk);
				block_rect(blk, player);
			}
		}
		//---------------------------------------
		//-------------------------DISPARA SHOOT
		if (shoot) {
			fire_missile();
			shoot = false;
		}
		//-------------------------FIM DISPARA SHOOT
		//-------------------------ATUALIZA POSIÇÃO SHOOT
		for (var i in missiles) {
			function remove() {
				remove_objetos(missile, missiles);
				remove_objetos(missile, sprites);
				remove_objetos(missile, enemies);
				i--;
			}
			var missile = missiles[i];
			missile.y += missile.vy;
			if (missile.y < -missile.h) {
				remove();
			}
			//------------------ interação inimigo com missile
			if (block_rect(skeleton, missile)) {
				skeleton.w = skeleton.w * 0.8;
				skeleton.h = skeleton.h * 0.8;
				remove();
			}
			//------------------- interação com award
			if (block_rect(award, missile)) {
				player.w = player.w * 1.08;
				player.h = player.h * 1.08;
				remove();
			}
			//-------------------FIM interação com award
		}
		//-------------------------FIM ATUALIZA POSIÇÃO SHOOT
		//----------------Movimento enemies
		//---Exercendo força da gravidade nos inimigos
		if (skeleton.visible) {
			skeleton.vetor_deslocamento_y += gravity;
			skeleton.y += skeleton.vetor_deslocamento_y;
			skeleton.x += skeleton.vetor_deslocamento_x;
		} else {
			skeleton.vetor_deslocamento_x = 0;
			skeleton.vetor_deslocamento_y = 0;
		}
		//---Fim Exercendo força da gravidade nos inimigos
		//---Inimigo bate no chão
		if (skeleton.y + skeleton.h > cnv.height - 50 || skeleton.y < 0) {
			if (skeleton.y < 0) {
				skeleton.y = 0;
			} else {
				skeleton.y = cnv.height - 50 - skeleton.h;
			}
			if (skeleton.vetor_deslocamento_y > 4) {
				skeleton.vetor_deslocamento_y = 4;
			}
			skeleton.vetor_deslocamento_y *= -1.5;
		}
		//---Fim Inimigo bate no chão
		//---Inimigo bate nas paredes
		if (skeleton.x + skeleton.w > cnv.width || skeleton.x < 0) {
			if (skeleton.x < 0) {
				skeleton.x = 0;
			} else {
				skeleton.x = cnv.width - skeleton.w;
			}
			if (skeleton.vetor_deslocamento_x > 3) {
				skeleton.vetor_deslocamento_x = 3;
			}
			skeleton.vetor_deslocamento_x *= -1.5;
		}
		//---Fim Inimigo bate nas paredes

		//----------------Fim Movimento enemies
	}
	//--------------- REMOVE OS OBJETOS DO JOGO
	function remove_objetos(object_to_remove, array) {
		var i = array.indexOf(object_to_remove);
		if (i != -1) {
			array.splice(i, 1);
		}
	}
	//---------------FIM REMOVE OS OBJETOS DO JOGO
	//-------------------------CRIAÇÃO DO SHOOT
	function fire_missile() {
		var missile = new Sprite(
			player.center_x() - 2.5,
			player.center_y() - 2.5,
			5,
			5,
			'#000',
		);
		// velocidade do missile
		missile.vy = -8;
		sprites.push(missile);
		missiles.push(missile);
		enemies.push(missile);
	}
	//------------------------- FIM CRIAÇÃO DO SHOOT
	function render() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (var i in sprites) {
			var spr = sprites[i];
			if (spr.visible) {
				ctx.fillStyle = spr.color;
				ctx.fillRect(spr.x, spr.y, spr.w, spr.h);
			}
		}

		ctx.fillText(`player pos x : ${player.x}`, 10, 10);
		ctx.fillText(`player pos y : ${player.y}`, 10, 20);
		ctx.fillText(`player w : ${player.w}`, 10, 30);
		ctx.fillText(`canvas w : ${cnv.width}`, 10, 40);
		ctx.fillText(`canvas h : ${cnv.width}`, 10, 50);
		ctx.fillText(`block skeleton x missile : `, 10, 60);
	}

	loop();
};
