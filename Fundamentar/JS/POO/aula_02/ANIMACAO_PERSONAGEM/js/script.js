window.onload = function () {
	var LEFT = 37,
		UP = 38,
		RIGHT = 39,
		DOWN = 40;
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');
	var spriteSheet = new Image();
	spriteSheet.src = './images/img.png';
	var zezim = new Sprite(spriteSheet);
	var scene = new Image();
	scene.src = './images/map.png';

	window.addEventListener('keydown', keyDownHandler, false);
	window.addEventListener('keyup', keyUpHandler, false);

	function movements(e, status) {
		function direction(l, u, r, d) {
			zezim.mv_right = r;
			zezim.mv_left = l;
			zezim.mv_up = u;
			zezim.mv_down = d;
		}
		var key = e.keyCode;
		switch (key) {
			case RIGHT:
				direction(false, false, status, false);
				break;
			case LEFT:
				direction(status, false, false, false);
				break;
			case UP:
				direction(false, status, false, false);
				break;
			case DOWN:
				direction(false, false, false, status);
				break;
		}
	}
	function keyDownHandler(e) {
		movements(e, true);
	}
	function keyUpHandler(e) {
		movements(e, false);
	}

	spriteSheet.onload = function () {
		zezim.pos_x = 120;

		zezim.pos_y = 40;
		init();
	};
	function init() {
		loop();
	}
	function update() {
		zezim.move();
	}
	function draw() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		ctx.drawImage(scene, 0, 0, 200, 200, 0, 0, cnv.width, cnv.height);
		zezim.draw(ctx);
	}
	function loop() {
		window.requestAnimationFrame(loop, cnv);
		draw();
		update();
	}
};
