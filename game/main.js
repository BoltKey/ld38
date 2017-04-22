var selectedPlanet;
var turns = 0;
var resources = 30000;
var earth;

function main() {
	
	
	createPlanets();
	planets[2].pollution = .8;
	createUI();
	earth = planets[2];
	selectPlanet(planets[2]);
	
	earth.currTerra = 1;
	
	
	generateStars();
	
	update();
}

function selectPlanet(p) {
	if ($.isNumeric(p))
		p = planets[p];
	selectedPlanet = p;
	var d = $("#planet-ui");
	d.html("<div id='sel-name'>" + p.name + "</div>");
	d.append("<div id='sel-info'>" + 
				"<div id='sel-pop'><span class='sel-h'>Population: </span>" + n(p.pop) + " (" + n(p.maxPop) + ")</div>" +
				"<div id='sel-pol'><span class='sel-h'>Pollution: </span>" + (Math.round((p.pollution) * 1000)) / 10 + "%(" + (p.polGrowth() > 0 ? "+" : "") + (Math.round((p.polGrowth()) * 1000)) / 10 + ")</div>" +
				"<div id='sel-prod'><span class='sel-h'>Production (x" + p.prodRatio + "): </span>" + r(p.prod()) + "</div>" + 
				"<div id='sel-prod'><span class='sel-h'>Growth: </span>" + (Math.round((p.growth() - 1) * 1000)) / 10 + "%</div>" + 
				"<div id='sel-prod'><span class='sel-h'>Terraform: </span>" + p.currTerra + "/" + p.toTerra + " (+" + p.activeTmts +")</div>" +
				 "<div id='sel-dist'><span class='sel-h'>Distance: </span>" + Math.round(Math.distance(earth.pos(), p.pos()))/100 + " AU</div>" + 
				 
				
			"</div>" +
			"<table id='action-wrap' border = 1>" + 
			// the question is not "why?". The question is "why not?". view-source:http://www.fileformat.info/info/unicode/char/1f332/evergreen_tree.svg
				"<tr><th class='send-terraform'><svg viewbox='0 0 150 300'><path d='M159.3281 261.1406 Q133.1719 252.1406 126.2812 249.3281 Q107.8594 241.875 95.2031 232.875 L92.3906 232.875 Q91.8281 236.6719 91.8281 243.1406 Q91.8281 302.625 94.9219 311.2031 Q95.0625 311.4844 101.1094 320.4844 Q95.7656 321.4688 89.5781 321.4688 Q85.0781 321.4688 80.0156 320.9062 L80.0156 233.4375 L79.3125 232.875 L78.0469 232.875 Q21.9375 263.6719 15.0469 263.6719 Q11.5312 263.6719 11.5312 260.0156 Q11.5312 256.3594 35.4375 244.5469 Q45 239.7656 61.875 221.7656 Q80.0156 202.3594 80.0156 193.9219 L80.0156 187.875 Q79.4531 187.3125 78.0469 187.3125 L22.9219 212.4844 L21.7969 211.5 L21.7969 208.6875 Q56.25 190.8281 78.6094 155.25 Q82.4062 149.2031 82.4062 148.2188 L82.4062 139.0781 L81.8438 138.5156 Q79.3125 138.7969 75.0938 142.0312 Q71.8594 144.4219 68.7656 146.9531 Q59.4844 153.2812 35.5781 165.2344 L31.2188 164.3906 L31.5 162.5625 Q48.6562 152.8594 63.9844 133.875 Q80.8594 113.0625 82.5469 95.4844 L84.0938 92.9531 L87.75 92.9531 Q87.75 110.9531 105.75 133.1719 Q122.2031 153.4219 140.2031 162.5625 L140.4844 164.25 Q139.7812 165.2344 137.8125 165.2344 Q133.1719 165.2344 114.8906 153.8438 Q99.2812 144.2812 92.25 138.5156 Q91.6875 139.6406 91.6875 141.0469 Q91.6875 157.5 112.7812 180.7031 Q132.3281 202.3594 149.2031 208.8281 L148.2188 212.4844 Q145.9688 211.3594 121.3594 200.6719 Q105.0469 193.6406 95.2031 187.3125 L92.25 187.3125 Q91.8281 187.7344 91.8281 190.8281 Q91.8281 205.7344 118.2656 230.0625 Q143.0156 252.8438 159.3281 257.4844 L159.3281 261.1406 Z'/></svg></td>" + 
					"<td class='terraform' onclick='selectedPlanet.send(false, 1)'><div class='tmt amt'>1</div> <div class='tmt cost'>" + r(selectedPlanet.sendCost(false, 1, earth.pos())) + "</div></td>" + 
					"<td class='terraform' onclick='selectedPlanet.send(false, 2)'><div class='tmt amt'>2</div> <div class='tmt cost'>" + r(selectedPlanet.sendCost(false, 2, earth.pos())) + "</div></td>" + 
					"<td class='terraform' onclick='selectedPlanet.send(false, 3)'><div class='tmt amt'>3</div> <div class='tmt cost'>" + r(selectedPlanet.sendCost(false, 3, earth.pos())) + "</div></td>" + 
				"<tr><th class='send-people'><svg viewbox='0 0 150 300'><circle cx='75' cy='55' r='50' /><path d='M75,105 L75,200 L25,300 M75,200 L125,300 M0,150 L150,150'></path></svg></td></div>" + 
					"<td class='ppl-send' onclick='selectedPlanet.send(true, 1)'><div class='ppl amt'>100k</div> <div class='ppl cost'>" + r(selectedPlanet.sendCost(true, 1, earth.pos())) + "</div></td>" + 
					"<td class='ppl-send' onclick='selectedPlanet.send(true, 2)'><div class='ppl amt'>10mil</div> <div class='ppl cost'>" + r(selectedPlanet.sendCost(true, 2, earth.pos())) + "</div></td>" + 
					"<td class='ppl-send' onclick='selectedPlanet.send(true, 3)'><div class='ppl amt'>1bil</div> <div class='ppl cost'>" + r(selectedPlanet.sendCost(true, 3, earth.pos())) + "</div></td>" + 
				"</tr>" +
			"</table>" );
}

function createUI() {
	$("#game").after("<table class='planet-select' border=1></table>")
	for (var i = 0; i < 4; ++i) {
		$(".planet-select").append( "<tr class='planet-row'>" + 
										"<td onclick='selectPlanet(" + i + ")'>" + planets[i].name + "</td>" + 
										"<td onclick='selectPlanet(" + (i + 4) + ")'>" + planets[i+4].name + "</td>" + 
									"</tr>");
	}
	
	$("#wrap").append(  "<div id='middle-display'>" + 
							"<div class='mid-h'>Resources:<br><span id='res'>" + r(resources) + "</div>" + 
							"<div class='mid-h'>Population:<br></span><span id='pop'>" + n(planets[2].pop) + "</div>" + 
						"</div>");
	$("#wrap").append("<div id='planet-ui'></div>");
}

function update() {
	requestAnimationFrame(update);
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
}

function newTurn() {
	for (var p of planets) {
		p.newTurn();
	}
	selectPlanet(selectedPlanet);
	$("#res").html(r(resources));
	$("#pop").html(n(planets.reduce(function(a, p) { return a + p.pop }, 0 )));
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