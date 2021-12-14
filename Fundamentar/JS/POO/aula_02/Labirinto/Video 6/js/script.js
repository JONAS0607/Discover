(function () {
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');

	var WIDTH = cnv.width,
		HEIGHT = cnv.height;

	var LEFT = 37,
		UP = 38,
		RIGHT = 39,
		DOWN = 40;
	var mvLeft = (mvUp = mvRight = mvDown = false);

	var tileSize = 64;
	var tileSrcSize = 96;

	var img = new Image();
	img.src = 'img/img.png';
	img.addEventListener(
		'load',
		function () {
			requestAnimationFrame(loop, cnv);
		},
		false,
	);
	var floor = new Image();
	floor.src = 'img/floor.png';
	floor.addEventListener(
		'load',
		function () {
			requestAnimationFrame(loop, cnv);
		},
		false,
	);

	var walls = [];

	var player = {
		x: tileSize + 2,
		y: tileSize + 2,
		width: 24,
		height: 32,
		speed: 2,
		//atributos de animação
		srcX: 0,
		srcY: tileSrcSize,
		countAnim: 0,
	};

	var maze = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];

	var T_WIDTH = maze[0].length * tileSize,
		T_HEIGHT = maze.length * tileSize;

	for (var row in maze) {
		for (var column in maze[row]) {
			var tile = maze[row][column];
			if (tile === 1) {
				var wall = {
					x: tileSize * column,
					y: tileSize * row,
					width: tileSize,
					height: tileSize,
				};
				walls.push(wall);
			}
		}
	}

	var cam = {
		x: 0,
		y: 0,
		width: WIDTH,
		height: HEIGHT,
		innerLeftBoundary: function () {
			return this.x + this.width * 0.25;
		},
		innerTopBoundary: function () {
			return this.y + this.height * 0.25;
		},
		innerRightBoundary: function () {
			return this.x + this.width * 0.75;
		},
		innerBottomBoundary: function () {
			return this.y + this.height * 0.75;
		},
	};

	function blockRectangle(objA, objB) {
		var distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
		var distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

		var sumWidth = (objA.width + objB.width) / 2;
		var sumHeight = (objA.height + objB.height) / 2;

		if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
			var overlapX = sumWidth - Math.abs(distX);
			var overlapY = sumHeight - Math.abs(distY);

			if (overlapX > overlapY) {
				objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
			} else {
				objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
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

	function update() {
		if (mvLeft && !mvRight) {
			player.x -= player.speed;
			//ajuste de orientação da animação para esquerda
			player.srcY = tileSrcSize + player.height * 2;
		} else if (mvRight && !mvLeft) {
			player.x += player.speed;
			//ajuste de orientação da animação para direita
			player.srcY = tileSrcSize + player.height * 3;
		}
		if (mvUp && !mvDown) {
			player.y -= player.speed;
			//ajuste de orientação da animação para cima
			player.srcY = tileSrcSize + player.height * 1;
		} else if (mvDown && !mvUp) {
			player.y += player.speed;
			//ajuste de orientação da animação para baixo
			player.srcY = tileSrcSize + player.height * 0;
		}

		//processo de animação
		if (mvLeft || mvRight || mvUp || mvDown) {
			player.countAnim++;

			if (player.countAnim >= 40) {
				player.countAnim = 0;
			}

			player.srcX = Math.floor(player.countAnim / 5) * player.width;
		} else {
			player.srcX = 0;
			player.countAnim = 0;
		}

		for (var i in walls) {
			var wall = walls[i];
			blockRectangle(player, wall);
		}

		if (player.x < cam.innerLeftBoundary()) {
			cam.x = player.x - cam.width * 0.25;
		}
		if (player.y < cam.innerTopBoundary()) {
			cam.y = player.y - cam.height * 0.25;
		}
		if (player.x + player.width > cam.innerRightBoundary()) {
			cam.x = player.x + player.width - cam.width * 0.75;
		}
		if (player.y + player.height > cam.innerBottomBoundary()) {
			cam.y = player.y + player.height - cam.height * 0.75;
		}

		cam.x = Math.max(0, Math.min(T_WIDTH - cam.width, cam.x));
		cam.y = Math.max(0, Math.min(T_HEIGHT - cam.height, cam.y));
	}

	function imgFloor(
		tile,
		x,
		y,
		pos_img_x,
		pos_img_y,
		plus_height = 0,
		plus_width = 0,
	) {
		ctx.drawImage(
			floor,
			tile * 1 + pos_img_x, //pos_img_x no file
			pos_img_y, //pos_img_y no file
			tileSrcSize + plus_width, // tamanho da imagem no browser x
			tileSrcSize + plus_height, // tamanho da imagem no browser y
			x, //pos_img_x no browser
			y, //pos_img_y no browser
			tileSize,
			tileSize,
		);
	}

	function render() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.save();
		ctx.translate(-cam.x, -cam.y);
		for (var row in maze) {
			for (var column in maze[row]) {
				var tile = maze[row][column];
				var x = column * tileSize;
				var y = row * tileSize;
				function floor(tile, x, y) {
					imgFloor(tile, x, y - 46, 0, 106);
					imgFloor(tile, x - 65, y - 14, 0, 106);
					imgFloor(tile, x - 97, y - 94, 300, 106);
					// imgFloor(tile, x, y - 46, 400, 106);
					// imgFloor(tile, x - 65, y - 14, 0, 106);
					imgFloor(tile, x - 97, y + 2, 700, 106);
					// imgFloor(tile, x - 97, y + 66, 600, 106);
				}
				if (tile == 1) {
					ctx.fillRect(x, y, 64, 64);
					floor(tile, x, y);
				} else {
					floor(tile, x, y);
				}
			}
		}
		function arvores(tile, x, y, local_x, localx, altura) {
			imgFloor(tile, x, y, local_x, 1370, altura, localx);
			imgFloor(tile, x, y + 64, local_x, 1500, 0, localx);
			// imgFloor(tile, 45, 206, local_x, 1360, 48, localx);
			// imgFloor(tile, 45, 270, local_x, 1500, 0, localx);
			imgFloor(tile, x, y + 64, local_x, 1500, 0, localx);
		}
		//desenha o personagem
		ctx.drawImage(
			img,
			player.srcX,
			player.srcY,
			player.width,
			player.height,
			player.x,
			player.y,
			player.width,
			player.height,
		);
		arvores(tile, 150, 20, 0, 0, 50);
		arvores(tile, 100, 150, 430, 150, 38);
		arvores(tile, 300, 150, 700, 200, 38);

		ctx.restore();
	}

	function loop() {
		update();
		render();
		requestAnimationFrame(loop, cnv);
	}
})();
