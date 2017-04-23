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

function updateStars() {
	for (var i = 0; i < stars.length; ++i) {
		var s = stars[i];
		var s1 = (s.x - canvas.width / 2) * 0.01;
		var s2 = (s.y - canvas.height / 2) * 0.01;
		s.x += s1;
		s.y += s2;
		s.r += (Math.distance([0, 0], [s1, s2])) * 0.01;
		
		if (s.x > canvas.width + 20 || s.x < -20 || s.y > canvas.height + 20 || s.y < -20) {
			stars.splice(i, 1);
			--i;
		}
	}
	if (Math.random() < 0.1) {
		stars.push({x: canvas.width / 2 + (Math.random() - .5) * 200, y: canvas.height / 2 + (Math.random() - .5) * 200, r: Math.random() * .1  })
	}
}