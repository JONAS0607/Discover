var Sprite = function (img_x, img_y, img_w, img_h, x, y) {
	this.img_x = img_x;
	this.img_y = img_y;
	this.img_w = img_w;
	this.img_h = img_h;
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
};
Sprite.prototype.center_x = function () {
	return this.x + this.img_w / 2;
};
Sprite.prototype.center_y = function () {
	return this.y + this.img_h / 2;
};

Sprite.prototype.half_w = function () {
	return this.img_w / 2;
};
Sprite.prototype.half_h = function () {
	return this.img_h / 2;
};

var Alien = function (img_x, img_y, img_w, img_h, x, y) {
	//PROPRIEDADES HERDADAS DE SPRITES
	Sprite.call(this, img_x, img_y, img_w, img_h, x, y);
	//PROPRIEDADES UNICAS DE ALIEN
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.CRAZY = 3;
	this.state = this.NORMAL;
	this.mv_style = this.NORMAL;
};
//METODOS HERDADOS DE SPRITE
Alien.prototype = Object.create(Sprite.prototype);
//METODO SOMENTE DE ALIEN
Alien.prototype.explode = function () {
	this.img_x = 80;
	this.w = this.h = 56;
};

var Object_message = function (y, txt, color, font) {
	this.x = 0;
	this.y = y;
	this.txt = txt;
	this.visible = true;
	this.font = `normal bold ${font}px emulogic`;
	this.color = color;
	this.baseline = 'top';
};
