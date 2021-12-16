var character = 0;
function Sprite(img) {
	this.mv_left = false;
	this.mv_up = false;
	this.mv_right = false;
	this.mv_down = false;

	this.pos_img_x = 0; // msg busca posição x na imagem
	this.pos_img_y; // msg busca posição y na imagem
	this.width = 24; // msg largura da imagem na imagem
	this.height = 32; // msg altura da imagem na imagem

	this.pos_cnv_x = 0; // msg posição x na canvas
	this.pos_cnv_y = 0; // msg posição y na canvas

	this.img = img; // folha sprite
	this.speed = 5;
	this.count_animation = 0;

	this.draw = function (ctx, char) {
		character = char;
		ctx.drawImage(
			this.img,
			this.pos_img_x, // msg busca posição x na imagem
			(this.pos_img_y = 32 * character), // msg busca posição y na imagem
			this.width, // msg largura da imagem na imagem
			this.height, // msg altura da imagem na imagem
			this.pos_cnv_x, // msg posição x na canvas
			this.pos_cnv_y, // msg posição y na canvas
			this.width * 2, // msg tamanho da area de visualização da imagem no eixo x
			this.height * 2, // msg tamanho da área de visualização da imagem no eixo y
		);
		this.animation();
	};
	//Movimento do personagem

	this.move = function () {
		if (this.mv_left) {
			this.pos_cnv_x -= this.speed;
			this.pos_img_y = this.height * character;
		}
		if (this.mv_up) {
			this.pos_cnv_y -= this.speed;
			this.pos_img_y = this.height * character;
		}
		if (this.mv_right) {
			this.pos_cnv_x += this.speed;
			this.pos_img_y = this.height * character;
		}
		if (this.mv_down) {
			this.pos_cnv_y += this.speed;
			this.pos_img_y = this.height * character;
		}
	};
	//Animação do personagem
	this.animation = function () {
		if (this.mv_left || this.mv_down || this.mv_right || this.mv_up) {
			this.count_animation += 4;
			var pos_char = 0;
			this.mv_down
				? (pos_char = this.width * 0) // sul
				: this.mv_up
				? (pos_char = this.width * 12) // norte
				: this.mv_left
				? (pos_char = this.width * 6) // oeste
				: this.mv_right
				? (pos_char = this.width * 18) // leste
				: '';

			if (this.count_animation >= 72) {
				this.count_animation = 0;
			}

			this.pos_img_x =
				Math.floor(this.count_animation / 24) * this.width + pos_char;
		}
	};

	this.info = function (ctx) {
		ctx.font = `bold 15px Arial`;
		ctx.fillStyle = '#fff';
		ctx.fillText(`contador : ${this.count_animation}`, 10, 25);
		ctx.fillText(`pos img x : ${this.pos_img_x}`, 10, 50);
		ctx.fillText(`pos canvas x : ${this.pos_cnv_x}`, 10, 75);

		ctx.fillText(
			`movimentos [ left:${this.mv_left} ] [ up:${this.mv_up} ] [ right:${this.mv_right} ]  [ down:${this.mv_down} ]`,
			10,
			100,
		);
	};
}
