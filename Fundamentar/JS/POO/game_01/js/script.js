window.onload = function () {
	var random_char = Math.floor(Math.random() * (23 - 0) + 0);
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');

	var spriteSheet = new Image();
	spriteSheet.src = './img/characters.gif';
	var scene = new Image();
	scene.src = './img/map.png';

	const LEFT = 65;
	const UP = 87;
	const RIGHT = 68;
	const DOWN = 83;

	var player_1 = new Sprite(spriteSheet);
	//OBJETOS
	var sprites = [];
	var game_world = {
		img: scene,
		x: 0,
		y: 0,
		width: 672,
		height: 664,
	};

	sprites.push(game_world);
	// sprites.push(player_1);
	var camera = {
		x: 0,
		y: 0,
		width: scene.width,
		height: scene.height,
		left_edge: function () {
			return this.x + this.width * 0.25;
		},
		up_edge: function () {
			return this.y + this.height * 0.25;
		},
		right_edge: function () {
			return this.x + this.width * 0.75;
		},
		down_edge: function () {
			return this.y + this.height * 0.75;
		},
	};

	window.addEventListener('keydown', keyDownHandler, false);
	window.addEventListener('keyup', keyUpHandler, false);

	function movements(e, status) {
		function direction(l, u, r, d) {
			player_1.mv_right = r;
			player_1.mv_left = l;
			player_1.mv_up = u;
			player_1.mv_down = d;
		}
		var key = e.keyCode;
		switch (key) {
			case RIGHT:
				direction(false, false, status, false);
				break;
			case LEFT:
				direction(status, false, false, false);
				break;
			case UP:
				direction(false, status, false, false);
				break;
			case DOWN:
				direction(false, false, false, status);
				break;
		}
	}

	function keyDownHandler(e) {
		movements(e, true);
	}
	function keyUpHandler(e) {
		movements(e, false);
	}

	function update() {
		// player_1.pos_cnv_x <= 0 ? (player_1.pos_cnv_x = 0) : '';
		// player_1.pos_cnv_y <= 0 ? (player_1.pos_cnv_y = 0) : '';
		// player_1.pos_cnv_x >= cnv.width - 50
		// 	? (player_1.pos_cnv_x = cnv.width - 50)
		// 	: '';
		// player_1.pos_cnv_y >= cnv.height - 70
		// 	? (player_1.pos_cnv_y = cnv.height - 70)
		// 	: '';
		// if (player_1.pos_cnv_x < camera.left_edge()) {
		// 	camera.x = player_1.pos_cnv_x - camera.width * 0.25;
		// }
		// if (player_1.pos_cnv_x + player_1.width > camera.right_edge()) {
		// 	camera.x = player_1.pos_cnv_x + player_1.width - camera.width * 0.75;
		// }
		// if (player_1.pos_cnv_y + player_1.height > camera.down_edge()) {
		// 	camera.y = player_1.pos_cnv_y + player_1.height - camera.height * 0.75;
		// }
		// if (player_1.pos_cnv_y < camera.up_edge()) {
		// 	camera.y = player_1.pos_cnv_y - camera.height * 0.25;
		// }

		player_1.move();
	}
	function render() {
		ctx.save();
		ctx.translate(-camera.x, -camera.y);
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (var i in sprites) {
			var spr = sprites[i];
			ctx.drawImage(
				spr.img,
				0, // msg busca posição x na imagem
				0, // msg busca posição y na imagem
				spr.width / 2, // msg largura da imagem na imagem
				spr.height / 4, // msg altura da imagem na imagem
				0, // msg posição x na canvas
				0, // msg posição y na canvas
				spr.width * 2, // msg tamanho da area de visualização da imagem
				spr.height * 4, // msg tamanho da área de visualização da imagem
			);
		}
		ctx.restore();

		// ctx.fillText(`player - canvas width : ${}`, 10, 180);

		player_1.info(ctx);
		player_1.draw(ctx, random_char);
	}
	spriteSheet.onload = function () {
		player_1.pos_cnv_x = cnv.width / 2;
		player_1.pos_cnv_y = cnv.height / 2;
		init();
	};
	function init() {
		loop();
	}
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}
};
