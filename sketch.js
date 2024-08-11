// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)
let classifier;
let button;
let canvas;

let width = 400;
let height = 400;
let backgroundColor = 255;
let classResults;

//Disables right clicking
document.addEventListener('contextmenu', event => event.preventDefault());

function preload() {
  classifier = ml5.imageClassifier("doodlenet");
}

function setup() {
  // put setup code here
  createCanvas(width, height);
	// webgl allows for this to work across all browsers
	ml5.setBackend("webgl");

	let button = createButton('clear');
  button.position(0, height-50);
	button.mousePressed(clear);

	background(backgroundColor);
}

function draw() {
	if(mouseIsPressed) {
		if(mouseButton === LEFT) {
			strokeWeight(16);
			stroke(0);
			fill(0);
		}
		else if (mouseButton === RIGHT) {
			strokeWeight(48);
			stroke(backgroundColor);
			fill(backgroundColor);
		}
		line(mouseX, mouseY, pmouseX, pmouseY);
		classify();
	}
}

function classify() {
	let canvas = document.getElementById("defaultCanvas0");
	classifier.classify(canvas, gotResult);
}

// Callback function for when classification has finished
function gotResult(results) {
  // The results are in an array ordered by confidence
  classResults = results;
	console.log(results);
}

function clear() {
	background(backgroundColor);
}