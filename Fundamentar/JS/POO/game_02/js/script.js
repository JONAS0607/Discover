window.onload = function () {
	const cnv = document.querySelector('canvas');
	const ctx = cnv.getContext('2d');

	//recursos
	var background = new Image();
	background.src = './img/casa.png';

	var player = new Image();
	player.src = './img/characters.gif';
	var speed = 2;

	//OBJETOS
	var sprites = [];
	var game_world = {
		img: background,
		px: 0,
		py: 0,
		x: 0,
		y: 0,
		width: 1536,
		height: 2160,
	};
	var char = {
		img: player,
		px: 0,
		py: 0,
		x: 0,
		y: 0,
		width: 24,
		height: 32,
	};
	sprites.push(game_world);
	sprites.push(char);

	//CRIANDO CAMERA
	var cam = {
		x: 0,
		y: 0,
		width: cnv.width,
		height: cnv.height,
		// metodos que vão determinar a fronteira onde o personagem vai se mover sem precisar mover a camera
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
	//Centralizar a camera
	cam.x = (game_world.width - cam.width) / 2;
	cam.y = (game_world.height - cam.height) / 2;
	//Centralizar a camera
	char.x = (game_world.width - char.width) / 2;
	char.y = (game_world.height - char.height) / 2;

	// VARIAVEIS DE MOVIMENTAÇÃO PELAS TECLAS

	var LEFT = 65;
	var UP = 87;
	var RIGHT = 68;
	var DOWN = 83;
	var SPACE = 32;
	var mv_left = false;
	var mv_up = false;
	var mv_right = false;
	var mv_down = false;

	//move o char
	window.addEventListener('keydown', keyDownHandler, false);
	window.addEventListener('keyup', keyUpHandler, false);

	function moveChar(e, status) {
		var key = e.keyCode;
		function movements(l, u, r, d) {
			mv_left = l;
			mv_up = u;
			mv_right = r;
			mv_down = d;
		}
		switch (key) {
			case LEFT:
				movements(status, false, false, false);
				break;
			case UP:
				movements(false, status, false, false);
				break;
			case RIGHT:
				movements(false, false, status, false);
				break;
			case DOWN:
				movements(false, false, false, status);
				break;
		}
	}
	function keyDownHandler(e) {
		moveChar(e, true);
	}
	function keyUpHandler(e) {
		moveChar(e, false);
	}

	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}

	function update() {
		anima();
		// movimenta o char
		mv_left
			? (char.x -= speed)
			: mv_up
			? (char.y -= speed)
			: mv_right
			? (char.x += speed)
			: mv_down
			? (char.y += speed)
			: '';
		// atualiza a posição da camera em função do char
		if (char.x < cam.left_edge()) {
			cam.x = char.x - cam.width * 0.25;
		}
		if (char.y < cam.up_edge()) {
			cam.y = char.y - cam.height * 0.25;
		}
		if (char.x + char.width > cam.right_edge()) {
			cam.x = char.x + char.width - cam.width * 0.75;
		}
		if (char.y + char.height > cam.down_edge()) {
			cam.y = char.y + char.height - cam.height * 0.75;
		}
		//-------------------------------------------------limite da camera
		//esquerda
		if (cam.x < 0) {
			cam.x = 0;
		}
		//direita
		if (cam.x + cam.width > game_world.width) {
			cam.x = game_world.width - cam.width;
		}
		//top
		if (cam.y < 0) {
			cam.y = 0;
		}
		//botton
		if (cam.y + cam.height > game_world.height) {
			cam.y = game_world.height - cam.height;
		}
		//-----------------------------------------------limita personagem
		if (char.x < 0) {
			char.x = 0;
		}
		//direita
		if (char.x + char.width > game_world.width) {
			char.x = game_world.width - char.width;
		}
		//top
		if (char.y < 0) {
			char.y = 0;
		}
		//botton
		if (char.y + char.height > game_world.height) {
			char.y = game_world.height - char.height;
		}
	}
	var count_animation = 0;
	function anima() {
		if (mv_left || mv_down || mv_right || mv_up) {
			count_animation += 4;
			var pos_char = 0;

			mv_down
				? (pos_char = char.width * 0) // sul
				: mv_up
				? (pos_char = char.width * 12) // norte
				: mv_left
				? (pos_char = char.width * 6) // oeste
				: mv_right
				? (pos_char = char.width * 18) // leste
				: '';
			if (count_animation >= 72) {
				count_animation = 0;
			}
			char.px = Math.floor(count_animation / 24) * char.width + pos_char;
		}
	}
	var random_char = Math.floor(Math.random() * (23 - 0) + 0);

	function render() {
		ctx.save();
		ctx.translate(-cam.x, -cam.y); // faz com que o cenario seja desenhado em função da câmera
		//criando uma estrutura de repetição para buscar objetos em uma array

		for (var i in sprites) {
			var spr = sprites[i];
			//colocando o background na canvas
			if (i == 0) {
				ctx.drawImage(
					spr.img, // imagem
					spr.px, // pos x da imagem na imagem
					spr.py, // pos y da imagem na imagem
					spr.width, // redimesiona o eixo x da imagem, aumenta/ diminui imagem no eixo x
					spr.height, // redimensiona o eixo y da imagem, aumenta/ diminui imagem no eixo x
					spr.x, // cordenada x de exibição da imagem na canvas
					spr.y, // cordenada y de exibição da imagem na canvas
					spr.width, // tamanho x de exibição da imagem especifica limite da exibição
					spr.height, // tamanho y de exibição da imagem especifica limite da exibição
				);
			} else {
				// CHARACTER
				spr.py = 32 * random_char;
				ctx.drawImage(
					spr.img, // imagem
					spr.px, // pos x da imagem na imagem
					spr.py, // pos y da imagem na imagem
					spr.width, // redimesiona o eixo x da imagem, aumenta/ diminui imagem no eixo x
					spr.height, // redimensiona o eixo y da imagem, aumenta/ diminui imagem no eixo x
					spr.x, // cordenada x de exibição da imagem na canvas
					spr.y, // cordenada y de exibição da imagem na canvas
					spr.width * 1.5, // tamanho x de exibição da imagem especifica limite da exibição
					spr.height * 1.5, // tamanho y de exibição da imagem especifica limite da exibição
				);
			}
		}
		ctx.restore();
		ctx.fillStyle = '#fff';
		ctx.fillText(`ANIMATION : ${count_animation}`, 10, 10);
		ctx.fillText(`position : ${char.px}`, 10, 20);
	}

	loop();
};
