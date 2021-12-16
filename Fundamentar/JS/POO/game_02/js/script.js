(function () {
	const cnv = document.getElementById('canvas');
	const ctx = cnv.getContext('2d');

	function loop() {
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}
	function update() {}
	function render() {}

	loop();
});
