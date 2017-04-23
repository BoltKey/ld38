var dots = [{age: 1000}];
function updateDots() {
	for(var d of dots) {
		++d.age;
		d.x += d.speedx;
		d.y += d.speedy
	}
}
function drawDots() {
	for(var i = dots.length - 1; dots[i].age < 200 && i > 0; --i) {
		var d = dots[i];
		ctx.fillStyle = d.bg;
		ctx.beginPath();
		ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
		ctx.globalAlpha = Math.max(0, 1 - d.age / 200);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
}