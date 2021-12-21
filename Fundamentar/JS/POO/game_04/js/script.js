(function () {
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');

	var sprites = [];

	create_player(sprites);
	create_wall(sprites);
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}

	function update() {
		player_limit(cnv);
		player_gravity();
		move_player();
	}
	function render() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		ctx.save();
		for (var i in sprites) {
			var spr = sprites[i];
			ctx.fillStyle = spr.color;
			ctx.fillRect(spr.x, spr.y, spr.w, spr.h);
		}

		message(ctx, 10, 30, `player x : ${player.x}`, 25, '#000');
		message(ctx, 10, 60, `player y : ${player.y}`, 25, '#000');
		message(ctx, 10, 90, `player vy : ${player.vy} `, 25, '#000');
		ctx.restore();
		wall_collision();
	}
	loop();
})();
