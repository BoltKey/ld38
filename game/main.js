var selectedPlanet;
var turns = 0;
var resources = 6000;
var timer = 0;
var gameEnd;
var earth;
var packets = [];
var divPos;
var sunRad = 20;
var score = 0;
var burnTimer = 100;
var ranks = [];
var sounds = {};
var muted = false;
var started = false;
var tInterval = 150;
var script = [
"     3568, planet Earth     ",
"Someone, somewhere made a huge mistake",
"The planet is downright poisonous",
"Horrible diseases",
"Earthquakes",
"Breathable atmosphere is long gone",
"The individuals with last bits of hope",
"put all their effort into developing a system",
"able to terraform planets",
"and safely deploy humans",
"It is time to leave",
"Each ship has its destination planet",
"Click to send the ship in that direction",
"Try to not hit the sun"
]

function main() {
	
	createPlanets();
	
	//mouse
	window.oncontextmenu = function() { return false };
	 divPos = {x: 0, y: 0};
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
	
	//sounds
	sounds.good = [];
	for (var i = 0; i < 4; ++i) {
		sounds.good.push(new Audio("sound/good.wav"));
		sounds.good[i].volume = 0.3
	}
	sounds.bad = [];
	for (var i = 0; i < 4; ++i) {
		sounds.bad.push(new Audio("sound/bad.wav"));
		sounds.bad[i].volume = 0.3
	}
	sounds.sun = [];
	for (var i = 0; i < 4; ++i) {
		sounds.sun.push(new Audio("sound/sun.wav"));
		sounds.sun[i].volume = 0.3
	}
	sounds.good.c = 0;
	sounds.bad.c = 0;
	sounds.sun.c = 0;
	sounds.music = new Audio("sound/space.wav");
	sounds.music.loop = true;
	sounds.music.volume = 0.3;
	sounds.music.play();
	
	earth = planets[2];
	var nextDest
	do {
		nextDest = Math.floor(Math.random() * planets.length);
	} while (planets[nextDest] === earth);
	earth.packet = new Packet(0, 0, nextDest);
	earth.currTerra = 1;
	earth.pop = 145;
	
	generateStars();
	
	update();
}

function restart() {
	for (var p of planets)
		p.pop = 0;
	earth.pop = 100;
	gameEnd = undefined;
	score = 0;
}

function update() {
	++timer;
	++burnTimer;
	requestAnimationFrame(update);
	if (earth.pop <= 0 && packets.length > 0 && mouseDown) {
		for (var i = 0; i < 5; ++i)
			step();
	}
	step();
	draw();
}

function step() {
	for (var p of planets) {
		p.update();
	}
	for (var i = 0; i < packets.length; ++i) {
		var p = packets[i];
		p.update();
		if (p.ded) {
			packets.splice(i, 1);
			if (earth.pop === 0 && packets.length === 0) {
				gameEnd = timer;
			}
		}
	}
	updateSun();
	updateStars();
	updateDots();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStars();
	drawSun();
	drawDots();
	
	
	for (var p of planets) {
		p.draw();
	}
	for (var p of packets) {
		p.draw();
	}
	
	// resources indicator
	ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	
	ctx.textAlign = "left";
	ctx.fillText("Deliveries: " + Math.round(planets.reduce(function(s, p) {return p.pop + s}, 0) - earth.pop) , 20, 60);
	ctx.fillText("Score: " + score , 20, 90);
	
	// intro
	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
	ctx.globalAlpha = Math.min(1, Math.max(0, -timer / 600 + 2));
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.globalAlpha = Math.min(1, Math.max(0, (tInterval/2 - Math.abs(timer % tInterval - tInterval/2)) / 20));
	ctx.textAlign = "center";
	ctx.fillStyle = "white";
	var t = script[Math.floor(timer / tInterval)];
	if (t)
		ctx.fillText(t, canvas.width / 2, canvas.height / 2 - 60);
	

	ctx.globalAlpha = Math.min(1, Math.max(0, timer / 600));
	ctx.textAlign = "left";
	ctx.fillStyle = "white";
	ctx.fillText("Earth population: " + Math.round(earth.pop) + " mil", 20, 30);
	
	//result
	if (gameEnd) {
		var ranks = ["F", "E", "D", "C", "B", "A", "S"];
		var reqs = [-1000, -10, 20, 90, 150, 250, 350];
		var fin = reqs.length - 1;
		while (reqs[fin] > score) 
			--fin;
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.globalAlpha = Math.min(1, Math.max(0, (timer - gameEnd) / 100));
		ctx.fillText("Final rank: " + ranks[fin], canvas.width / 2, canvas.height / 2 - 60);
		ctx.globalAlpha = Math.min(1, Math.max(0, (timer - gameEnd) / 100 - 1));
		ctx.fillText("Click to try again", canvas.width / 2, canvas.height / 2 + 60);
	}
	ctx.globalAlpha = 1;
}

function drawSun() {
	ctx.beginPath();
	ctx.arc(canvas.width / 2, canvas.height / 2, sunRad, 0, Math.PI * 2);
	var c = 128 + Math.floor(Math.max(0, Math.min(1, burnTimer / 50)) * 127);
	ctx.fillStyle = "rgb(" + c + ", " + Math.floor(c / 3) + ", 0)";
	
	
	ctx.fill();
}
function updateSun() {
	var alpha = Math.random() * Math.PI * 2;
	var c = 128 + Math.floor(Math.max(0, Math.min(1, burnTimer / 50)) * 127);
	ctx.fillStyle = "rgb(" + c + ", " + Math.floor(c / 3) + ", 0)";
	dots.push({x: canvas.width / 2 + Math.cos(alpha) * sunRad, y: canvas.height / 2 + Math.sin(alpha) * sunRad, age: 0, bg: ctx.fillStyle, speedx: (Math.random() - .5) * .1, speedy: (Math.random() - .5) * .1});
	dots.push({x: canvas.width / 2 + Math.cos(alpha) * Math.random() * sunRad, y: canvas.height / 2 + Math.sin(alpha) * Math.random() * sunRad, age: 0, bg: "#ffaa00", speedx: (Math.random() - .5) * .1, speedy: (Math.random() - .5) * .1});
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