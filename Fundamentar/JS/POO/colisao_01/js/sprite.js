var Sprite = function (x, y, w, h, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.visible = true;
};
Sprite.prototype.half_width = function () {
	return this.w / 2;
};
Sprite.prototype.half_height = function () {
	return this.h / 2;
};
Sprite.prototype.center_x = function () {
	return this.x + this.half_width();
};
Sprite.prototype.center_y = function () {
	return this.y + this.half_height();
};
