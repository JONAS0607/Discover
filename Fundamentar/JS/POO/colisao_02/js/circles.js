var Squares = function (x, y, w, h, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.visible = true;
};
Squares.prototype.half_width = function () {
	return this.w / 2;
};
Squares.prototype.half_height = function () {
	return this.h / 2;
};
Squares.prototype.center_x = function () {
	return this.x + this.half_width();
};
Squares.prototype.center_y = function () {
	return this.y + this.half_height();
};
