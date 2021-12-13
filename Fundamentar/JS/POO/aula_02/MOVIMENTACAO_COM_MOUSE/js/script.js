var cnv = document.querySelector('canvas');
var ctx = cnv.getContext('2d');

var gravity = 0.1;
var cateto_x = 0,
	cateto_y = 0,
	hypotenusa = 0;
//OBJETO
var ball = {
	radius: 50,
	vetor_deslocamento_x: Math.floor(Math.random() * 10) + 1,
	vetor_deslocamento_y: 0,
	pos_x: 30,
	pos_y: 30,
	color: '#00f',
	held: false,
};
cnv.addEventListener('mousedown', mouseDownHandler, false);
cnv.addEventListener('mouseup', mouseUpHandler, false);
cnv.addEventListener('mousemove', mouseMoveHandler, false);

function mouseDownHandler(e) {
	var cssValue = 'cursor: -webkit-grabbing; cursor: -moz-grabbing';
	cnv.style.cssText = cssValue;
	cateto_x = ball.pos_x - e.offsetX;
	cateto_y = ball.pos_y - e.offsetY;
	hypotenusa = Math.sqrt(cateto_x * cateto_x + cateto_y * cateto_y);
	if (hypotenusa < ball.radius && !ball.held) {
		// ball.held = ball.held ? false : true;
		ball.held = true;
	}
}
function mouseUpHandler() {
	var cssValue = 'cursor: -webkit-grab; cursor: -moz-grab';
	cnv.style.cssText = cssValue;
	if (ball.held) {
		ball.held = false;
		ball.vetor_deslocamento_x = Math.floor(Math.random() * 10) + 1;
	}
}
function mouseMoveHandler(e) {
	if (ball.held) {
		ball.pos_x = e.offsetX;
		ball.pos_y = e.offsetY;
	}
}

function loop() {
	window.requestAnimationFrame(loop, cnv);
	update();
	render();
}
function update() {
	//exercendo força de gravidade
	if (!ball.held) {
		ball.vetor_deslocamento_y += gravity;
		ball.pos_y += ball.vetor_deslocamento_y;
		ball.pos_x += ball.vetor_deslocamento_x;
	} else {
		ball.vetor_deslocamento_x = 0;
		ball.vetor_deslocamento_y = 0;
	}

	//fazer quicar no chão
	if (ball.pos_y + ball.radius > cnv.height) {
		ball.pos_y = cnv.height - ball.radius;
		ball.vetor_deslocamento_y *= -0.8;
	}

	//fazer quicar nas paredes
	if (ball.pos_x - ball.radius < 0 || ball.pos_x + ball.radius > cnv.width) {
		if (ball.pos_x - ball.radius < 0) {
			ball.pos_x = ball.radius;
		} else {
			ball.pos_x = cnv.width - ball.radius;
		}
		ball.vetor_deslocamento_x *= -0.8;
	}
	//fazer bola parar
	if (Math.abs(ball.vetor_deslocamento_x) < 1) {
		ball.vetor_deslocamento_x = 0;
	}
}
function render() {
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.fillStyle = ball.color;
	ctx.beginPath();
	ctx.arc(ball.pos_x, ball.pos_y, ball.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	// ctx.stroke();
	ctx.fill();

	ctx.font = `bold 25px Arial`;

	ctx.fillText(`hypotenusa: ${hypotenusa}`, 10, 30);
	ctx.fillText(`cateto x  : ${ball.pos_x}`, 10, 60);
	ctx.fillText(`cateto y  : ${ball.pos_y}`, 10, 80);
}

loop();
