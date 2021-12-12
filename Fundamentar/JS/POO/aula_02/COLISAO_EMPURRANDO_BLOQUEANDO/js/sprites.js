// function testeSprite() {
// 	alert('Sprite ok');
// 	testeColl();
// }

var Sprite = function (pos_x, pos_y, width, height, color) {
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.visible = true;
};
Sprite.prototype.halfWidth = function () {
	return this.width / 2;
};
Sprite.prototype.halfHeight = function () {
	return this.height / 2;
};
Sprite.prototype.center_x = function () {
	return this.pos_x + this.halfWidth();
};
Sprite.prototype.center_y = function () {
	return this.pos_y + this.halfHeight();
}; 
