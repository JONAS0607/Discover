window.onload = function () {
	var LEFT = 37,
		UP = 38,
		RIGHT = 39,
		DOWN = 40;
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');
	var spriteSheet = new Image();
	spriteSheet.src = './images/img.png';

	var zezim = new Sprite(spriteSheet);

	var scene = new Image();
	scene.src = './images/map.png';

	window.addEventListener('keydown', keyDownHandler, false);
	window.addEventListener('keyup', keyUpHandler, false);

	function movements(e, status) {
		function direction(l, u, r, d) {
			zezim.mv_right = r;
			zezim.mv_left = l;
			zezim.mv_up = u;
			zezim.mv_down = d;
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

	spriteSheet.onload = function () {
		init();
	};
	function init() {
		loop();
	}
	function update() {
		if (zezim.pos_x < camera.left_edge()) {
			camera.x = zezim.pos_x - camera.width * 0.25;
		}
		if (zezim.pos_y < camera.up_edge()) {
			camera.y = zezim.pos_y - camera.height * 0.25;
		}
		if (zezim.pos_x + zezim.width > camera.right_edge()) {
			camera.x = zezim.pos_x + zezim.width - camera.width * 0.75;
		}
		if (zezim.pos_y + zezim.height > camera.down_edge()) {
			camera.y = zezim.pos_y + zezim.height - camera.height * 0.75;
		}

		//limite da camera
		if (camera.x < 0) {
			camera.x = 0;
		}
		if (camera.x + camera.width > game_world.width) {
			camera.x = game_world.width - camera.width;
		}
		if (camera.y < 0) {
			camera.y = 0;
		}
		if (camera.y + camera.height > game_world.height) {
			camera.y = game_world.height - camera.height;
		}
		zezim.move();

		// console.log(camera.x);
	}

	//OBJETOS
	var sprites = [];
	var game_world = {
		img: scene,
		x: 0,
		y: 0,
		width: scene.width,
		height: scene.height,
	};
	sprites.push(game_world);
	sprites.push(zezim);

	var camera = {
		x: 0,
		y: 0,
		width: cnv.width,
		height: cnv.height,
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
	function draw() {
		ctx.save();
		ctx.translate(-camera.x, -camera.y);
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (let i in sprites) {
			var spr = sprites[i];
			if (i == 1) {
				zezim.draw(ctx);
			}
			ctx.drawImage(
				spr.img,
				0,
				0,
				game_world.width,
				game_world.height,
				spr.x,
				spr.y,
				scene.width,
				scene.height,
			);
		}

		ctx.restore();
		// zezim.draw(ctx);
	}
	//centralizar personagem
	zezim.pos_x = (game_world.width - zezim.width) / 2;
	zezim.pos_y = (game_world.height - zezim.height) / 2;
	//centralizar a câmera
	camera.x = (game_world.width - camera.width) / 2;
	camera.y = (game_world.height - camera.height) / 2;

	function loop() {
		window.requestAnimationFrame(loop, cnv);
		draw();
		update();
	}
};
