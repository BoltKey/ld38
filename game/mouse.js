function click() {
	if (timer < tInterval * script.length) {
		timer += tInterval;
		timer -= timer%tInterval;
		console.log(timer);
		return;
	}
	else if (gameEnd) {
		if (timer - gameEnd > 50) {
			restart();
		}
		return;
	}
	if (earth.pop > 100)
		earth.pop = 100;
	var speedx = (divPos.x - earth.pos()[0]) * .03;
	var speedy = (divPos.y - earth.pos()[1]) * .03;
	if (Math.abs(speedx) > 3) {
		var r = Math.abs(speedx / 3);
		speedx /= r;
		speedy /= r;
	}
	if (Math.abs(speedy) > 3) {
		var r = Math.abs(speedy / 3);
		speedx /= r;
		speedy /= r;
	}
	if (earth.pop > 1) {
		earth.pop -= 1;
		packets.push(new Packet(speedx, speedy, earth.packet.dest));
		var r;
		do {r = Math.floor(Math.random() * planets.length)} while (r === planets.indexOf(earth));
		earth.packet.dest = r;
	}
}
function drop() {
	
}
function drag() {
	
}