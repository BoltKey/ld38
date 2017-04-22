var stars = [];

function generateStars() {
	for (var i = 0; i < 150; ++i) {
		stars.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5})
	}
}

function drawStars() {
	ctx.fillStyle = "white";
	for (var s of stars) {
		ctx.beginPath();
		ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
		ctx.fill();
	}
}