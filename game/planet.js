function Planet(settings) {
	settings = settings || {};
	this.size = settings.size;
	this.r = settings.r || 150;
	this.name = settings.name || "Mars";
	this.bg = settings.bg || "black";
	this.pop = 0;
	this.deliverCounter = 100;
	this.lastDeliver = -1;
	
	
	this.currTerra = 0;
	
	this.alpha = Math.random() * Math.PI * 2;
	
	this.draw = function() {
		
		
		var p = this.pos();
		for (var i = 0; i < 10; ++i) {
			ctx.beginPath();
			var x = p[0] - this.size * .04 * i * Math.cos(this.alpha);
			var y = p[1] - this.size * .04 * i * Math.sin(this.alpha);
			ctx.arc(x, y, this.size * (1 - Math.sqrt(2 * Math.pow(0.05 * i, 2))), 0, Math.PI * 2);
			ctx.fillStyle = this.bg;
			ctx.fill();
			ctx.fillStyle = "black";
			ctx.globalAlpha = .8 - .08 * i;
			ctx.fill();
			ctx.globalAlpha = 1;
			if (i < 9) {
			ctx.beginPath();
			ctx.arc(x, y, this.size * (1 - Math.sqrt(2 * Math.pow(0.05 * (i + 1, 2)))), 0, Math.PI * 2);
			ctx.fillStyle = this.bg;
			ctx.fill();
			}
		}
		if (this.deliverCounter < 20) {
			ctx.beginPath();
			ctx.arc(p[0], p[1], this.size * 1.2, 0, Math.PI * 2);
			ctx.strokeStyle = "rgba(" + (this.lastDeliver === planets.indexOf(this) ? "0, 255" : "255, 0") + ", 0, " + (1 - this.deliverCounter / 20) + ")";
			ctx.lineWidth = this.size * .4;
			ctx.stroke();
			
		}

		if (this.packet)
			this.packet.draw();
		
		
	}

	this.pos = function() {
		return [canvas.width / 2 + Math.cos(this.alpha) * this.r, canvas.height / 2 + Math.sin(this.alpha) * this.r];
	}
	this.update = function() {
		++this.deliverCounter;
		if (this.packet) {
			this.packet.x = this.pos()[0];
			this.packet.y = this.pos()[1];
			this.packet.speedx = divPos.x - this.pos()[0];
			this.packet.speedy = divPos.y - this.pos()[1];
			this.pop -= .02;
		}
		this.alpha += 1 / ( this.r);
		
		this.pop = Math.max(0, this.pop);
		
	}
}