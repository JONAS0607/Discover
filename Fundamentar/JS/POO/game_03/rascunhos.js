// Criando mapa a partir de uma array
/**
 var walls = [];
var maze = [
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
];

var tileSize = 40;

for (var row in maze) {
	for (var column in maze[row]) {
		var tile = maze[row][column];
		if (tile === 1) {
			var wall = {
				x: tileSize * column,
				y: tileSize * row,
				width: tileSize,
				height: tileSize,
			};
			walls.push(wall);
		}
	}
}
for (var row in maze) {
	for (var column in maze[row]) {
		var tile = maze[row][column];
		var x = column * tileSize;
		var y = row * tileSize;
		if (tile == 1) {
			context.fillRect(x, y, 40, 40);
			context.strokeRect(x, y, tileSize, tileSize);
		} else {
			context.strokeRect(x, y, tileSize, tileSize);
		}
	}
}
 * 
 * 
 */
