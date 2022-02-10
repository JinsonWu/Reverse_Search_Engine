function randint(start, end){
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

class Ball{
	constructor(){
		this.radius = randint(10, 50);
		this.coor = {x:randint(0, 500), y:randint(10, 400)};
		this.speed= {x:randint(5, 12) , y:randint(5, 12)};
		let  directionx=randint(0, 1);
		if(directionx < 0.5) this.speed.x = -this.speed.x;
		let  directiony=randint(0, 1);
		if(directiony < 0.5) this.speed.y = -this.speed.y;
		
		this.node = document.createElement("div");
		this.node.setAttribute("class", "ball");
		this.node.style.width = (2 * this.radius) + "px";
		this.node.style.height= this.node.style.width;
		this.node.style.backgroundColor = "rgba(" + randint(0, 255) + ", " + randint(0, 255) + ", " + randint(0, 255) + ", " + .5 + ")";
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}
	move(){
		this.coor.x += this.speed.x;
		if (this.coor.x > 800 - 2 * this.radius || this.coor.x < 0){
			this.speed.x = -this.speed.x/Math.abs(this.speed.x) * randint(3, 10);
			this.coor.x += this.speed.x;
		}
		this.coor.y += this.speed.y;
		if (this.coor.y > 600 - 2 * this.radius || this.coor.y < 0){
			this.speed.y = -this.speed.y/Math.abs(this.speed.y) * randint(3, 10);
			this.coor.y += this.speed.y;
		}
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}
}

var container = document.createElement("div");
//上下container不一樣，所以可以同名
container.setAttribute("id", "container");
document.body.appendChild(container);

var aBall = [];
var balls = 7;
for (var i = 0; i < balls; i++){
	aBall.push(new Ball());
	container.appendChild(aBall[i].node);				//最重要的一行
}
function go(){
	for (let i = 0; i < balls; i++){
		aBall[i].move();
	}	
}
let timer = setInterval(go, 100);