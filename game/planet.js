function Planet(settings) {
	settings = settings || {};
	this.r = settings.r || 150;
	this.size = settings.size || 10;
	this.maxPop = settings.maxPop || 1000000;
	this.prodRatio = settings.prodRatio || 1;
	this.pop = settings.pop || 0;
	this.toTerra = settings.toTerra || 1;
	this.activeTmts = 0;
	this.speed = settings.speed || 1;
	this.name = settings.name || "Mars";
	this.bg = settings.bg || "black";
	
	this.pollution = 0;
	this.currTerra = 0;
	
	this.alpha = Math.random() * Math.PI * 2;
	
	this.draw = function() {
		var p = this.pos();
		ctx.beginPath();
		ctx.arc(p[0], p[1], this.size, 0, Math.PI * 2);
		ctx.fillStyle = this.bg;
		ctx.fill();
		
		// terraformed indicator
		ctx.beginPath();
		ctx.arc(p[0], p[1], this.size * 1.2, 0, Math.PI * 2);
		ctx.strokeStyle = "red";
		if (this.toTerra === this.currTerra)
			ctx.strokeStyle = "green";
		ctx.lineWidth = this.size * .2;
		ctx.stroke();
		
		// terraform progress indicator
		if (this.currTerra !== this.toTerra) {
			ctx.beginPath();
			ctx.moveTo(p[0], p[1]);
			ctx.arc(p[0], p[1], this.size , Math.PI * 3/2, Math.PI * 3/2 + Math.PI * 2 * (this.currTerra / this.toTerra));
			ctx.fillStyle = "rgba(255, 255, 255, .6)";
			
			ctx.fill();
		}
		
		// population indicator
		ctx.beginPath();
		ctx.arc(p[0], p[1], this.size * 1.5, Math.PI * 3/2, Math.PI * 3/2 + Math.PI * (this.pop / this.maxPop));
		ctx.strokeStyle = "#ffffdd";
		ctx.lineWidth = this.size * .5;
		ctx.stroke();
		
		// pollution indicator
		ctx.beginPath();
		ctx.arc(p[0], p[1], this.size * 2, Math.PI * 3/2, Math.PI * 3/2 + Math.PI * 2 * (this.pollution));
		ctx.strokeStyle = "gray";
		ctx.lineWidth = this.size * .3;
		ctx.stroke();
		
		
	}
	this.prod = function() {
		return Math.sqrt(this.pop) * (1.1-this.pollution) * 100;
	}
	this.growth = function() {
		return 1 + (.3 - this.pollution) * .1;
		
	}
	this.polGrowth = function() {
		return Math.max(0, (1 - this.pollution) * ((Math.atan(this.pop / this.maxPop) / (2 * Math.PI)) - .02));
	}
	this.pos = function() {
		return [canvas.width / 2 + Math.cos(this.alpha) * this.r, canvas.height / 2 + Math.sin(this.alpha) * this.r];
	}
	this.sendCost = function(people, amt, origin) {
		if (people) {
			return (Math.round(Math.pow(Math.sqrt(Math.distance(this.pos(), origin)), 1 + amt*2))) * 10;
		}
		else {
			return (Math.round(Math.pow(Math.sqrt(Math.distance(this.pos(), origin)), 2 + amt*.8))) * 10;
		}
	}
	this.send = function(people, amt) {
		var cost = this.sendCost(people, amt, earth.pos());
		var pplAmt = 100 * Math.pow(100, amt - 1)
		if (cost <= resources && (!people || earth.pop > pplAmt)) {
			if (people) {
				earth.pop -= pplAmt;
				this.pop += pplAmt;
			}
			else {
				this.activeTmts += amt;
			}
			resources -= cost;
			newTurn();
		}
	}
	this.newTurn = function() {
		
		this.alpha += (100 * 4 * Math.pow(Math.PI, 2)) / (12 * 2 * Math.PI * this.r);
		resources += this.prod();
		this.currTerra += this.activeTmts;
		this.currTerra = Math.min(this.currTerra, this.toTerra);
		this.pop *= this.growth();
		this.pop *= this.currTerra / this.toTerra;
		this.pollution += this.polGrowth();
		this.pollution = Math.max(0, this.pollution);
	}
}