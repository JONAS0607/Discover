var walls = [];

var mapa = [
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
];

function create_wall(sprites) {
	for (var i in mapa) {
		for (j in mapa[i]) {
			var tile = mapa[i][j];
			if (tile === 1) {
				var wall = new Sprite(60 * j, 190 * i, 90, 20, '#000');
				sprites.push(wall);
				walls.push(wall);
			}
		}
	}
}

function wall_collision() {
	for (var i in walls) {
		var wall = walls[i];
		// collision(wall, player);
		collision(player, wall);
	}
}
