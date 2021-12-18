var Sprites = function (x, y, w, h, color, name) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.visible = true;
	this.name = name;
};

Sprites.prototype.half_width = function () {
	return this.w / 2;
};
Sprites.prototype.half_height = function () {
	return this.h / 2;
};
Sprites.prototype.center_x = function () {
	return this.x + this.half_width();
};
Sprites.prototype.center_y = function () {
	return this.y + this.half_height();
};
