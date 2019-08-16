/*




			



							++==	+==	   ==+	===+  ++===+    |
							||__	|  \  /	 |	 __|  ||   |  __+__		 
							||		|	\/	 |	|  |  ||   |	|
							++==	|		 |	+==+  ||   |	|___

									Created at 2019/8/6
										 Shemane









*/
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
function range(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function color() {
	var r = Math.floor(Math.random() * 1000) % 240 + 15;
	var g = Math.floor(Math.random() * 1000) % 240 + 15;
	var b = Math.floor(Math.random() * 1000) % 230 + 25;
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}
function Gech(x, y, r) {
	//All things rotates in circle
	this.r = r;
	this.x = x
	this.y = y;
	this.rad = 2 * Math.PI;
	this.sides = this.r / 2;
	this.angle = Math.PI * 2 / this.sides;
	this.speed = 0.02;
	this.len = this.r * 0.5;
	this.col = color();
	this.effect = [6];
	this.update = () => {
		if (this.rad >= Math.PI * 2 || this.rad <= -Math.PI * 2) {
			//this.rad = effect
			//We have 6 rads added in graphs so the number of avaliable effects 6*6 = 36
			//In each complete circle, it will change the effect randomly
			//moveTo has maximum two effect
			//lineTo has max 4 effect
			this.speed = -this.speed;
			this.col = color();
			for (var i = 0; i < 6; i++) {
				this.effect[i] = Math.floor(Math.random() * 10) % 2 == 0 ? this.rad : 0.0;
			}


		}
		this.rad += this.speed;
		for (var i = 0; i < 6; i++) {
			if (this.effect[i] == 0.0) { continue; }
			this.effect[i] = this.rad;
		}
		this.draw();
	};
	this.draw = () => {
		for (var i = 0; i < this.sides; i += 1) {
			c.beginPath();
			c.strokeStyle = this.col;
			c.lineWidth = 5;
			c.moveTo(this.x + Math.cos(i * this.angle + this.effect[0]) * this.r, this.y + Math.sin(i * this.angle + this.effect[1]) * this.r);
			c.lineTo(this.x + Math.cos(i * this.angle + this.effect[2]) * this.r + Math.cos(i * this.angle + this.effect[3]) * this.len, this.y + Math.sin(i * this.angle + this.effect[4]) * this.r + Math.sin(i * this.angle + this.effect[5]) * this.len);
			c.stroke();
			c.closePath();
		}
	};
}
var shape;
function init() {
	shape = [];
	var r = 100;
	var x = innerWidth / 2;
	var y = innerHeight / 2;
	var sides = 3;
	shape.push(new Gech(x, y, r));
	// shape.push(new Gech(x, y,r+r/2));
	// shape.push(new Gech(x-x/2, y,r));
	// shape.push(new Gech(x+x/2, y,r));



}
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,0.5)';
	//c.clearRect(0,0,innerWidth, innerHeight);
	c.fillRect(0, 0, innerWidth, innerHeight);
	shape.forEach(e => {
		e.update();
	});
}
init();
animate();	