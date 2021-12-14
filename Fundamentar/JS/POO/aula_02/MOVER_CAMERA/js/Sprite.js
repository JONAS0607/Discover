function Sprite(img) {
	//Atributos
	this.mv_right = this.mv_left = this.mv_up = this.mv_down = false;
	this.src_x = 0;
	this.src_y = 0;
	this.width = 37.3;
	this.height = 35;

	this.pos_x = this.pos_y = 0;
	this.img = img;
	this.speed = 1;
	this.count_Animation = 0;

	//Métodos

	//Desenha
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.src_x,
			this.src_y,
			this.width,
			this.height,
			this.pos_x,
			this.pos_y,
			this.width,
			this.height,
		);

		this.animation();
	};
	//Movimentos
	this.move = function () {
		if (this.mv_right) {
			this.pos_x += this.speed;
			this.src_y = this.height * 0;
		}
		if (this.mv_left) {
			this.pos_x -= this.speed;
			this.src_y = this.height * 1;
		}
		if (this.mv_up) {
			this.pos_y -= this.speed;
			this.src_y = this.height * 0;
		}
		if (this.mv_down) {
			this.pos_y += this.speed;
			this.src_y = this.height * 1;
		}
	};

	//Anima
	this.animation = function () {
		if (this.mv_left || this.mv_down || this.mv_right || this.mv_up) {
			var direction = 0;
			if (this.mv_left || this.mv_right) {
				direction = 112;
			} else {
				direction = 0;
			}

			this.count_Animation += 1;
			if (this.count_Animation >= 15) {
				this.count_Animation = 0;
			}
			this.src_x =
				Math.floor(this.count_Animation / 5) * this.width + direction;
		}
	};
}
var Info = function (x, y, w, h, color) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.visible = true;
};