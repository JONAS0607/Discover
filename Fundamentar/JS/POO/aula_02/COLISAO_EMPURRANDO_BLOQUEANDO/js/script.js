// (function () {
// 	testeSprite();
// })();

(function () {
	//variáveis
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');

	//Teclas
	var LEFT = 37,
		UP = 38,
		RIGHT = 39,
		DOWN = 40;

	//Movimentos
	var mv_left = (mv_up = mv_right = mv_down = false);

	//Arrays
	var sprites = [];
	var blocks = [];

	//Objetos
	var character = new Sprite(10, 10, 20, 15, '#00f');
	character.speed = 4;

	var block_1 = new Sprite(70, 50, 80, 50, '#0ff');
	var block_2 = new Sprite(200, 70, 70, 50, '#92f');
	sprites.push(character);
	sprites.push(block_1);
	sprites.push(block_2);
	blocks.push(block_1);
	blocks.push(block_2);

	//Entradas
	window.addEventListener('keydown', keyDownHandler, false);
	window.addEventListener('keyup', keyUpHandler, false);

	function movements(e, status) {
		var key = e.keyCode;
		switch (key) {
			case LEFT:
				mv_left = status;
				break;
			case UP:
				mv_up = status;
				break;
			case RIGHT:
				mv_right = status;
				break;
			case DOWN:
				mv_down = status;
				break;
		}
	}

	function keyDownHandler(e) {
		movements(e, true);
	}
	function keyUpHandler(e) {
		movements(e, false);
	}
	//funções
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}
	function update() {
		if (mv_left) {
			character.pos_x -= character.speed;
		}
		if (mv_up) {
			character.pos_y -= character.speed;
		}
		if (mv_right) {
			character.pos_x += character.speed;
		}
		if (mv_down) {
			character.pos_y += character.speed;
		}
		//limites da tela
		character.pos_x = Math.max(
			1,
			Math.min(cnv.width - character.width - 1, character.pos_x),
		);
		character.pos_y = Math.max(
			1,
			Math.min(cnv.height - character.height - 1, character.pos_y),
		);
		//Colisões
		for (let i in blocks) {
			var blk = blocks[i];
			if (blk.visible) {
				if (character.color == '#0f0') {
					block_rect(blk, character);
				} else {
					block_rect(character, blk);
				}
			}
		}
	}
	function render() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (let i in sprites) {
			var spr = sprites[i];
			if (spr.visible) {
				ctx.fillStyle = spr.color;
				ctx.fillRect(spr.pos_x, spr.pos_y, spr.width, spr.height);
			}
		}
	}

	loop();
})();
