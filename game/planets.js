var planets = [];

function createPlanets() {
	planets = [];
	
	planets.push(new Planet({name: "Merkur", r: 30, maxPop: 100000, prodRatio: 3, toTerra: 150, bg: "#a59826", size: 4}));
	planets.push(new Planet({name: "Venus", r: 70, maxPop: 40000, prodRatio: 1, toTerra: 50, bg: "#d24513", size: 5}));
	planets.push(new Planet({name: "Earth", r: 100, maxPop: 80000, prodRatio: 0.5, pop: 60000, toTerra: 0, bg: "#55889f", size: 6}));
	planets.push(new Planet({name: "Mars", r: 130, maxPop: 400000, prodRatio: 1.8, toTerra: 40, bg: "#dc6546", size: 8}));
	
	planets.push(new Planet({name: "Jupiter", r: 160, maxPop: 200000, prodRatio: 0.5, toTerra: 90, size: 15, bg: "#fbe5b2"}));
	planets.push(new Planet({name: "Saturn", r: 185, maxPop: 150000, prodRatio: 0.5, toTerra: 140, bg: "#ffc823"}));
	planets.push(new Planet({name: "Uranus", r: 210, maxPop: 500000, prodRatio: 3, toTerra: 90, bg: "#35d3ec"}));
	planets.push(new Planet({name: "Neptune", r: 240, maxPop: 200000, prodRatio: 5, toTerra: 90, bg: "#0a4cb8"}));
}