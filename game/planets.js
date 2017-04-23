var planets = [];

function createPlanets() {
	planets = [];
	
	planets.push(new Planet({name: "Merkur", r: 30, maxPop: 10000, prodRatio: 3, toTerra: 5, bg: "#a59826", size: 4}));
	planets.push(new Planet({name: "Venus", r: 70, maxPop: 4000, prodRatio: 1, toTerra: 10, bg: "#d24513", size: 5}));
	planets.push(new Planet({name: "Earth", r: 100, maxPop: 8000, prodRatio: 0.5, pop: 8000, toTerra: 0, bg: "#55889f", size: 6}));
	planets.push(new Planet({name: "Mars", r: 130, maxPop: 40000, prodRatio: 1.8, toTerra: 20, bg: "#dc6546", size: 8}));
	
	planets.push(new Planet({name: "Jupiter", r: 160, maxPop: 20000, prodRatio: 0.5, toTerra: 30, size: 15, bg: "#fbe5b2"}));
	planets.push(new Planet({name: "Saturn", r: 185, maxPop: 15000, prodRatio: 0.5, toTerra: 40, bg: "#ffc823"}));
	planets.push(new Planet({name: "Uranus", r: 210, maxPop: 5000, prodRatio: 3, toTerra: 30, bg: "#35d3ec"}));
	planets.push(new Planet({name: "Neptune", r: 240, maxPop: 2000, prodRatio: 5, toTerra: 30, bg: "#0a4cb8"}));
}