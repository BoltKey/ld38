function Packet(speedx, speedy, dest) {
	this.packet;
	this.x = earth.pos()[0];
	this.y = earth.pos()[1];
	this.speedx = speedx;
	this.speedy = speedy;
	this.dest = dest;
	this.ded = false;
	this.lifeTime = 0;
	this.draw = function() {
		ctx.fillStyle = planets[this.dest].bg;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(Math.atan(this.speedy / this.speedx) + Math.PI * (this.speedx < 0));
		
		ctx.beginPath();
		ctx.moveTo(-6, -6);
		ctx.lineTo(9, 0);
		ctx.lineTo(-6, 6);
		ctx.lineTo(0, 0);
		
		ctx.fill();
		ctx.restore();
		
		if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
			ctx.save();
			
			var x = Math.max(40, Math.min(canvas.width - 40, this.x));
			var y = Math.max(40, Math.min(canvas.height - 40, this.y));
			var d = Math.round(Math.distance([x, y], [this.x, this.y]));
			if (d > 1000)
				this.ded = true;
			ctx.translate(x, y);
			ctx.globalAlpha = Math.max(0, Math.min(1, 1 - d / 500 + 1));
			ctx.textAlign = "center";
			ctx.font = "20px Arial";
			ctx.fillText(d, 0, 10);
			
			var dx = x - this.x;
			var dy = y - this.y;
			if (dx === 0) {
				if (dy > 0) 
					ctx.rotate(Math.PI * 3/2);
				else 
					ctx.rotate(Math.PI * 1/2);
			}
			else if (dy === 0 && dx > 0)
				ctx.rotate(Math.PI);
			else {
				ctx.rotate(Math.atan(dy/dx) + (dx > 0 ? Math.PI : 0));
			}
			ctx.beginPath();
			ctx.moveTo(20, -10);
			ctx.lineTo(30, 0);
			ctx.lineTo(20, 10);
			ctx.lineWidth = 5;
			ctx.strokeStyle = ctx.fillStyle;
			ctx.stroke();
			
			ctx.restore();
			
		}
		
	}
	this.update = function() {
		++this.lifeTime;
		if (this.lifeTime % 5 === 0) {
			dots.push({x: this.x, y: this.y, age: 0, bg: planets[this.dest].bg, speedx: (Math.random() - .5) * .1, speedy: (Math.random() - .5) * .1});
		}
		this.x += this.speedx;
		this.y += this.speedy;
		for (var p of planets) {
			if (!(p === earth && this.lifeTime < 50)) {
				var pos = p.pos();
				var r = Math.distance(pos, [this.x, this.y]);
				var f = p.size / Math.pow(r, 2) * 10;
				this.speedy -= (this.y - pos[1]) / Math.distance([this.x, this.y], pos) * f;
				this.speedx -= (this.x - pos[0]) / Math.distance([this.x, this.y], pos) * f;
				if (Math.distance([this.x, this.y], pos) < p.size) {
					this.ded = true;
					p.pop += 1;
					p.deliverCounter = 0;
					p.lastDeliver = this.dest;
					score -= 5;
					if (this.dest === planets.indexOf(p)) {
						score += 25;
						if (!muted) {
							sounds.good[sounds.good.c++].play();
							sounds.good.c %= sounds.good.length-1;
						}
					}
					else if (!muted) {
						sounds.bad[sounds.bad.c++].play();
						sounds.bad.c %= sounds.bad.length-1;
					}
				}
				
			}
			
		}
		if (Math.distance([this.x, this.y], [canvas.width / 2, canvas.height / 2]) < sunRad) {
			this.ded = true;
			score -= 10;
			burnTimer = 0;
			if (!muted) {
				sounds.sun[sounds.sun.c++].play();
				sounds.sun.c %= sounds.sun.length-1;
			}
		}
		
		var pos = [canvas.width / 2, canvas.height / 2];
		var r = Math.distance(pos, [this.x, this.y]);
		var f = 100 / Math.pow(r, 2);
		this.speedy -= (this.y - pos[1]) / Math.distance([this.x, this.y], pos) * f;
		this.speedx -= (this.x - pos[0]) / Math.distance([this.x, this.y], pos) * f;
		
		
	}
}