window.onload = function () {
	const cnv = document.getElementById('canvas');
	const ctx = cnv.getContext('2d');

	var sprites = [];

	var player = new Sprite(0, 280, 20, 20, '#00f');
	sprites.push(player);

	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}
	function update() {
		player_movement(player);
		player_cnv_limit(cnv, player);
	}
	function render() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (var i in sprites) {
			var spr = sprites[i];
			ctx.fillStyle = spr.color;
			ctx.fillRect(spr.x, spr.y, spr.w, spr.h);
		}
		message(ctx, 10, 30, `player x : ${player.x}`, 25, '#000');
		message(ctx, 10, 60, `player y : ${player.y}`, 25, '#000');
		message(ctx, 10, 90, `gravity y : ${gravity_y}`, 25, '#000');
		message(ctx, 10, 120, `vx : ${vx}`, 25, '#000');
		message(ctx, 10, 150, `vy : ${vy}`, 25, '#000');
	}

	loop();
};
