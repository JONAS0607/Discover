var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');

var img = new Image();
img.src = 'aviao.png';
img.addEventListener(
	'load',
	function () {
		loop();
	},
	false,
);

var obj = {
	x: 100,
	y: 100,
	width: 80,
	height: 64,
	rotation: 0,
	img: img,
	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	},
};

var mouse = {};

// cnv.addEventListener(
// 	'mousemove',
// 	function (e) {
// 		// mouse.x = e.clientX - cnv.offsetLeft;
// 		// mouse.y = e.clientY - cnv.offsetTop;
// 	},
// 	false,
// );
cnv.addEventListener(
	'mousedown',
	function (e) {
		mouse.x = e.clientX - cnv.offsetLeft;
		mouse.y = e.clientY - cnv.offsetTop;
	},
	false,
);

function loop() {
	requestAnimationFrame(loop, cnv);
	update();
	render();
}

function update() {
	var dx = mouse.x - obj.centerX();
	var dy = mouse.y - obj.centerY();

	obj.rotation = Math.atan2(dy, dx);

	var distance = Math.sqrt(dx * dx + dy * dy);

	if (distance >= 1) {
		obj.x += dx * 0.05;
		obj.y += dy * 0.05;
	}
}

function render() {
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.save();
	ctx.translate(obj.centerX(), obj.centerY());
	ctx.rotate(obj.rotation);
	ctx.drawImage(
		obj.img,
		0,
		0,
		obj.width,
		obj.height,
		-obj.width / 2,
		-obj.height / 2,
		obj.width,
		obj.height,
	);
	ctx.restore();
}
