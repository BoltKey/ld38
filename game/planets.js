var planets = [];

function createPlanets() {
	planets = [];
	
	planets.push(new Planet({name: "Merkur", r: 30, maxPop: 10000, prodRatio: 3, toTerra: 5, bg: "#994400", size: 4}));
	planets.push(new Planet({name: "Venus", r: 70, maxPop: 4000, prodRatio: 1, toTerra: 10, bg: "#ff9900", size: 5}));
	planets.push(new Planet({name: "Earth", r: 100, maxPop: 8000, prodRatio: 0.5, pop: 8000, toTerra: 0, bg: "#55889f", size: 6}));
	planets.push(new Planet({name: "Mars", r: 130, maxPop: 40000, prodRatio: 1.8, toTerra: 20, bg: "#ff0000", size: 8}));
	
	planets.push(new Planet({name: "Jupiter", r: 160, maxPop: 20000, prodRatio: 0.5, toTerra: 30, size: 15, bg: "#ffffff"}));
	planets.push(new Planet({name: "Saturn", r: 185, maxPop: 15000, prodRatio: 0.5, toTerra: 40, size: 16, bg: "#ffff00"}));
	planets.push(new Planet({name: "Uranus", r: 210, maxPop: 5000, prodRatio: 3, toTerra: 30, size: 13, bg: "#00eeff"}));
	planets.push(new Planet({name: "Neptune", r: 240, maxPop: 2000, prodRatio: 5, toTerra: 30, size: 14, bg: "#0000ff"}));
}