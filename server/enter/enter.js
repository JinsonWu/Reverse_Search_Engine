function randint(start, end){
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

class Ball{
	constructor(){
		this.radius = randint(105, 115);
		this.coor = {x:randint(0, 1290), y:randint(10, 520)};
		this.speed= {x:randint(2, 5) , y:randint(2, 5)};
		let  directionx=randint(0, 1);
		if(directionx < 0.5) this.speed.x = -this.speed.x;
		let  directiony=randint(0, 1);
		if(directiony < 0.5) this.speed.y = -this.speed.y;
		
		this.node = document.createElement("div");
		if (i < 6){
			let ii = i + 1;
			this.node.text = document.createTextNode("HW" + ii);
		}
		else if(i == 6) {
			this.node.text = document.createTextNode("Search");
			this.node.setAttribute('id', 'Search');
			this.radius = randint(150, 165);
		}
		else {
			this.node.text = document.createTextNode("Game");
			this.node.setAttribute('id', 'Game');
			this.radius = randint(150, 165);
		}
		this.node.setAttribute("class", "ball");
		this.node.appendChild(this.node.text);
		this.node.style.width = (2 * this.radius) + "px";
		this.node.style.height= this.node.style.width;
		this.node.style.backgroundColor = "rgba(" + randint(0, 255) + ", " + randint(0, 255) + ", " + randint(0, 255) + ", " + .5 + ")";
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}
	move(){
		this.coor.x += this.speed.x;
		if (this.coor.x > 1530 - 2 * this.radius || this.coor.x < 0){
			this.speed.x = -this.speed.x/Math.abs(this.speed.x) * randint(3, 10);
			this.coor.x += this.speed.x;
		}
		this.coor.y += this.speed.y;
		if (this.coor.y > 750 - 2 * this.radius || this.coor.y < 0){
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
var balls = 8;
for (var i = 0; i < balls; i++){
	aBall.push(new Ball());
	container.appendChild(aBall[i].node);				//最重要的一行
}
function go(){
	for (let i = 0; i < balls; i++){
		aBall[i].move();
	}	
}
function run(e){
	e = e || window.event;
	switch(e.button){
		case 0:
			let choose = 0;
			let choosedistance = 10000;
			for (let i = 0; i < balls; i++){
				let temdistance = Math.sqrt( Math.pow( (e.clientX - aBall[i].coor.x - aBall[i].radius), 2) +Math.pow( (e.clientY - aBall[i].coor.y - aBall[i].radius), 2) );
				if(temdistance < choosedistance){
					choose = i + 1;
					choosedistance = temdistance;
				}
			}
			if ( choosedistance <= aBall[choose - 1].radius){
				switch(choose){
					case 7:
						window.location.href = "../Search.php";
						break;
					case 8:
						window.location.href = "../final/game/game.html";
						break;
					default:
						window.location.href = "../hw" + choose + "/hw" + choose + ".html";
						break;
				}
			}
	}
}
//讓event可重複執行
var newHandle = function (e){
	run(e);
}
//
let timer = setInterval(go, 100);
window.addEventListener("click", newHandle, false);