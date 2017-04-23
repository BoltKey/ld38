var selectedPlanet;
var turns = 0;
var resources = 6000;
var earth;
var packets = [];


function main() {
	
	
	createPlanets();
	
	//mouse
	window.oncontextmenu = function() { return false };
	$(document).bind('mousemove', function(e){
        divPos = {
            x: e.pageX,
            y: e.pageY
        }
        if(mouseDown) { drag() }
	})
	lastDivPos = {x: 0, y: 0};
	lastmd = 0;
	mouseDown = false;
	document.body.onmousedown = function(e) { 
		mouseDown = true;
		if (e.button === 2)
			click(true);
		else
			click(false);
	}
	document.body.onmouseup = function(e) { 
		mouseDown = false;
		drop();
	}
	
	earth = planets[2];
	earth.currTerra = 1;
	
	generateStars();
	
	update();
}


function update() {
	requestAnimationFrame(update);
	for (var p of planets) {
		p.newTurn();
	}
	for (var i = 0; i < packets.length; ++i) {
		var p = packets[i];
		p.update();
		if (p.ded) {
			packets.splice(i, 1);
		}
	}
	updateStars();
	draw();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStars();
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
	ctx.fillStyle = "yellow";
	ctx.fill();
	for (var p of planets) {
		p.draw();
	}
	for (var p of packets) {
		p.draw();
	}
	// resources indicator
	ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	ctx.fillText("Resources: " + Math.round(resources), 20, 30);
	
	ctx.fillText("System population: " + Math.round(planets.reduce(function(s, p) {return p.pop + s}, 0) + packets.filter(function(a) {return a.human}).length * 500) + " mil", 20, 60);
}

Math.distance = function(p1, p2) {
	return (Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)));
}
function r(n) {
	var omitOrder = 0;
	while (n >= 1000) {
		n /= 1000;
		omitOrder += 3;
	}
	var sufs = ["", "k", "mil", "bil", "tril"];
	return (Math.round(n*10)/10) + sufs[omitOrder / 3];
}
function n(a) {
	return r(a * 1000);
}