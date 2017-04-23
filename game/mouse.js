function click(right) {
	var speedx = (divPos.x - earth.pos()[0]) * .01;
	var speedy = (divPos.y - earth.pos()[1]) * .01;
	var packetCost = Math.distance([0, 0], [speedx, speedy]) * 10 + 100;
	if (resources >= packetCost) {
		resources -= packetCost;
		if (right) {
			packets.push(new Packet(true, speedx, speedy));
			earth.pop -= 500;
		}
		else {
			packets.push(new Packet(false, speedx, speedy));
		}
	}
}
function drop() {
	
}
function drag() {
	
}