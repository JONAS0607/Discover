function collision(objA, objB) {
	var distX = objA.x + objA.w / 2 - (objB.x + objB.w / 2);
	var distY = objA.y + objA.h / 2 - (objB.y + objB.h / 2);

	var sumWidth = (objA.w + objB.w) / 2;
	var sumHeight = (objA.h + objB.h) / 2;

	if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
		var overlapX = sumWidth - Math.abs(distX);
		var overlapY = sumHeight - Math.abs(distY);

		if (overlapX > overlapY) {
			objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
		} else {
			objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
		}
	}
}
