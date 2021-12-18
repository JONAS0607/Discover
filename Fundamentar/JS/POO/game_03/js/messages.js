var message = function (ctx, msg, p_x, p_y, f_h, f_color, bg_color) {
	ctx.save();
	ctx.font = `bold ${f_h}px Arial`;
	ctx.textBaseline = 'top';
	ctx.fillStyle = bg_color;
	var width = ctx.measureText(msg).width;
	ctx.fillRect(p_x, p_y, width, parseInt(f_h, 10));
	ctx.fillStyle = f_color;
	ctx.fillText(`${msg}`, p_x, p_y);
	ctx.restore();
};
