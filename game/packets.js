function Packet(human, speedx, speedy) {
	this.x = earth.pos()[0];
	this.y = earth.pos()[1];
	this.speedx = speedx;
	this.speedy = speedy;
	this.ded = false;
	this.human = human;
	this.lifeTime = 0;
	this.draw = function() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(Math.atan(this.speedy / this.speedx) + Math.PI * (this.speedx < 0));
		
		if (this.human) {
			ctx.beginPath();
			ctx.moveTo(-6, -6);
			ctx.lineTo(9, 0);
			ctx.lineTo(-6, 6);
			ctx.lineTo(0, 0);
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.restore();
		}
		else {
			ctx.beginPath();
			ctx.moveTo(-4, -4);
			ctx.lineTo(4, -4);
			ctx.lineTo(6, 0);
			ctx.lineTo(4, 4);
			ctx.lineTo(-4, 4);
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.restore();
		}
	}
	this.update = function() {
		++this.lifeTime;
		this.x += this.speedx;
		this.y += this.speedy;
		for (var p of planets) {
			if (!(p === earth && this.lifeTime < 10)) {
				var pos = p.pos();
				var r = Math.distance(pos, [this.x, this.y]);
				var f = p.size / Math.pow(r, 2) * 10;
				this.speedy -= (this.y - pos[1]) / Math.distance([this.x, this.y], pos) * f;
				this.speedx -= (this.x - pos[0]) / Math.distance([this.x, this.y], pos) * f;
				if (Math.distance([this.x, this.y], pos) < p.size) {
					this.ded = true;
					if (this.human) 
						p.pop += 500;
					else 
						++p.currTerra;
				}
			}
			
		}
		var pos = [canvas.width / 2, canvas.height / 2];
		var r = Math.distance(pos, [this.x, this.y]);
		var f = 100 / Math.pow(r, 2);
		this.speedy -= (this.y - pos[1]) / Math.distance([this.x, this.y], pos) * f;
		this.speedx -= (this.x - pos[0]) / Math.distance([this.x, this.y], pos) * f;
		
		
	}
}