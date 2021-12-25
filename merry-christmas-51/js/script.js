var requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

var transforms = ["transform",
	"msTransform",
	"webkitTransform",
	"mozTransform",
	"oTransform"];

var transformProperty = getSupportedPropertyName(transforms);

var snowflakes = [];

var browserWidth;
var browserHeight;

var numberOfSnowflakes = 60;

var resetPosition = false;

function setup() {
	window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
}
setup();

function getSupportedPropertyName(properties) {
	for (var i = 0; i < properties.length; i++) {
		if (typeof document.body.style[properties[i]] != "undefined") {
			return properties[i];
		}
	}
	return null;
}

function Snowflake(element, speed, xPos, yPos) {
	this.element = element;
	this.speed = speed;
	this.xPos = xPos;
	this.yPos = yPos;

	this.counter = 0;
	this.sign = Math.random() < 0.5 ? 1 : -1;

	this.element.style.opacity = .1 + Math.random();
	this.element.style.fontSize = 12 + Math.random() * 50 + "px";
}

Snowflake.prototype.update = function () {

	this.counter += this.speed / 5000;
	this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
	this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;

	setTranslate3DTransform(this.element, Math.round(this.xPos), Math.round(this.yPos));

	if (this.yPos > browserHeight) {
		this.yPos = -50;
	}
}

function setTranslate3DTransform(element, xPosition, yPosition) {
	var val = "translate3d(" + xPosition + "px, " + yPosition + "px" + ", 0)";
	element.style[transformProperty] = val;
}

function generateSnowflakes() {
	var originalSnowflake = document.querySelector(".snowflake");
	var snowflakeContainer = originalSnowflake.parentNode;
	browserWidth = document.documentElement.clientWidth;
	browserHeight = document.documentElement.clientHeight;
	for (var i = 0; i < numberOfSnowflakes; i++) {

		var snowflakeClone = originalSnowflake.cloneNode(true);
		snowflakeContainer.appendChild(snowflakeClone);

		var initialXPos = getPosition(50, browserWidth);
		var initialYPos = getPosition(50, browserHeight);
		var speed = 5 + Math.random() * 40;

		var snowflakeObject = new Snowflake(snowflakeClone,
			speed,
			initialXPos,
			initialYPos);
		snowflakes.push(snowflakeObject);
	}
	snowflakeContainer.removeChild(originalSnowflake);

	moveSnowflakes();
}

function moveSnowflakes() {
	for (var i = 0; i < snowflakes.length; i++) {
		var snowflake = snowflakes[i];
		snowflake.update();
	}

	if (resetPosition) {
		browserWidth = document.documentElement.clientWidth;
		browserHeight = document.documentElement.clientHeight;

		for (var i = 0; i < snowflakes.length; i++) {
			var snowflake = snowflakes[i];

			snowflake.xPos = getPosition(50, browserWidth);
			snowflake.yPos = getPosition(50, browserHeight);
		}

		resetPosition = false;
	}

	requestAnimationFrame(moveSnowflakes);
}


function getPosition(offset, size) {
	return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

function setResetFlag(e) {
	resetPosition = true;
}