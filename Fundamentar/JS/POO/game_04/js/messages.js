function message(ctx, px, py, txt, f, color) {
	// ctx.save();
	ctx.font = `bold ${f}px Arial`;
	ctx.fillStyle = color;
	ctx.fillText(txt, px, py);
	// ctx.restore();
}
