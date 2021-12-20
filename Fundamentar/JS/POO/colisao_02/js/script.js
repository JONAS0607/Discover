window.onload = function () {
	const cnv = document.getElementById('canvas');
	const ctx = cnv.getContext('2d');

	var gravity = 3;
	var vx = 1;
	var vy = 1;
	var speed = 4;

	var LEFT = 37,
		UP = 38,
		RIGHT = 39,
		DOWN = 40;
	var SPACE = 32;
	var SPACE_IS_DOWN = false;
	var mvLeft = (mvUp = mvRight = mvDown = false);

	var sprites = [];
	var walls = [];

	var player = new Squares(0, 0, 10, 10, '#f00');
	sprites.push(player);

	var mapa = [[1, 1, 1, 1, 1, 1]];
	for (var row in mapa) {
		for (var column in mapa[row]) {
			var tile = mapa[row][column];
			if (tile === 1) {
				var wall = new Squares(30 * column, 40 * row, 30, 20, '#000');
				sprites.push(wall);
				walls.push(wall);
			}
		}
	}
	window.addEventListener('keydown', keydownHandler, false);
	window.addEventListener('keyup', keyupHandler, false);

	function keydownHandler(e) {
		var key = e.keyCode;
		switch (key) {
			case LEFT:
				mvLeft = true;
				break;
			case UP:
				mvUp = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
			case DOWN:
				mvDown = true;
				break;
			case SPACE:
				SPACE_IS_DOWN = true;
				break;
		}
	}

	function keyupHandler(e) {
		var key = e.keyCode;
		switch (key) {
			case LEFT:
				mvLeft = false;
				break;
			case UP:
				mvUp = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case DOWN:
				mvDown = false;
				break;
		}
	}
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}
	function update() {
		if (SPACE_IS_DOWN) {
			player.y += -gravity * 3;

			setTimeout(() => {
				SPACE_IS_DOWN = false;
			}, 500);
		} else {
			player.y += gravity;
		}

		if (player.y > cnv.height - player.h) {
			player.y = cnv.height - player.h;
		}
		if (mvLeft) {
			player.x -= speed;
		}
		if (mvRight) {
			player.x += speed;
		}
		if (mvUp) {
			player.y -= speed;
		}
		if (mvDown) {
			player.y += speed;
		}
		for (var j in walls) {
			var wall_j = walls[j];
			block_rect(player, wall_j);
			wall_j.y += vy;
			wall_j.x += vx;
			// console.log(sprites.length);
			if (wall_j.y > cnv.height - wall_j.h) {
				vy *= -1;
			}
			if (wall_j.y < 0) {
				vy *= -1;
			}
			if (wall_j.x > cnv.width - wall_j.w) {
				vx *= -1;
			}
			if (wall_j.x < 0) {
				vx *= -1;
			}
		}
	}
	function render() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (var i in sprites) {
			var spr = sprites[i];
			ctx.fillStyle = spr.color;
			ctx.fillRect(spr.x, spr.y, spr.w, spr.h);
		}
	}

	loop();
};
