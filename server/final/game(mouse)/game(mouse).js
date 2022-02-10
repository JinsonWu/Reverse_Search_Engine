function randint(start, end){
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

class Enemyball{
	constructor(){
		let ball_contact = true;
		//ensure the enemyball created doesn't contact with other enemyball and ourball
		while(ball_contact){
			this.radius = randint(20, 50);
			this.coor = {x:randint(0, 600), y:randint(10, 400)};
			ball_contact = false;
			for(let i = 0; i < ball_build_number; i++){
				let distance = Math.sqrt( Math.pow( (this.coor.x + this.radius - aBall[i].coor.x - aBall[i].radius), 2) + Math.pow( (this.coor.y + this.radius - aBall[i].coor.y - aBall[i].radius), 2) );
				let min_accept_distance = this.radius + aBall[i].radius;
				if (min_accept_distance + 10>= distance)ball_contact = true;
			}	
			
			let distance = Math.sqrt( Math.pow( (this.coor.x + this.radius - bBall[0].coor.x - bBall[0].radius), 2) + Math.pow( (this.coor.y + this.radius - bBall[0].coor.y - bBall[0].radius), 2) );
			let min_accept_distance = this.radius + bBall[0].radius;
			if (min_accept_distance + 100 >= distance)ball_contact = true;			
		}
		//
		this.speed= {x:randint(3, 7)/10 , y:randint(3, 7)/10};
		let  directionx=randint(0, 1);
		if(directionx < 0.5) this.speed.x = -this.speed.x;
		let  directiony=randint(0, 1);
		if(directiony < 0.5) this.speed.y = -this.speed.y;		
		this.node = document.createElement("div");
		this.node.setAttribute("class", "enemyball");
		this.node.style.width = (2 * this.radius) + "px";
		this.node.style.height= this.node.style.width;
		this.node.style.backgroundColor = "rgba(" + randint(80, 255) + ", " + randint(80, 255) + ", " + randint(80, 255) + ", " + .7 + ")";
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}
	move(){
		this.coor.x += this.speed.x;
		this.coor.y += this.speed.y;
		
		if(this.coor.x > (800 - 2 * this.radius) ){
			this.speed.x = -this.speed.x;
			this.coor.x = 800 - 2 * this.radius;
		}
		else if (this.coor.x < 0){
			this.speed.x = -this.speed.x;
			this.coor.x = 0;
		}
		if(this.coor.y > (600 - 2 * this.radius) ){
			this.speed.y = -this.speed.y;
			this.coor.y = 600 - 2 * this.radius;
		}
		else if (this.coor.y < 0){
			this.speed.y = -this.speed.y;
			this.coor.y = 0;
		}
		
		for(let n = temi + 1; n < balls; n++){
			let distance = Math.sqrt( Math.pow( (this.coor.x + this.radius - aBall[n].coor.x - aBall[n].radius), 2) + Math.pow( (this.coor.y + this.radius - aBall[n].coor.y - aBall[n].radius), 2) );
			let min_accept_distance = this.radius + aBall[n].radius;
			if (min_accept_distance >= distance){
				this.coor.x -= this.speed.x;
				this.coor.y -= this.speed.y;
				
				let temx = this.speed.x;
				let temy = this.speed.y;
				
				this.speed.x = (this.speed.x * (Math.pow(this.radius, 2) - Math.pow(aBall[n].radius, 2) ) + 2 * Math.pow(aBall[n].radius, 2) * aBall[n].speed.x) / ( Math.pow(this.radius, 2) + Math.pow(aBall[n].radius, 2) );
				this.speed.y = (this.speed.y * (Math.pow(this.radius, 2) - Math.pow(aBall[n].radius, 2) ) + 2 * Math.pow(aBall[n].radius, 2) * aBall[n].speed.y) / ( Math.pow(this.radius, 2) + Math.pow(aBall[n].radius, 2) );
				
				aBall[n].speed.x = (aBall[n].speed.x * (Math.pow(aBall[n].radius, 2) - Math.pow(this.radius, 2) ) + 2 * Math.pow(this.radius, 2) * temx) / ( Math.pow(this.radius, 2) + Math.pow(aBall[n].radius, 2) );
				aBall[n].speed.y = (aBall[n].speed.y * (Math.pow(aBall[n].radius, 2) - Math.pow(this.radius, 2) ) + 2 * Math.pow(this.radius, 2) * temy) / ( Math.pow(this.radius, 2) + Math.pow(aBall[n].radius, 2) );

				this.coor.x += this.speed.x;
				this.coor.y += this.speed.y;
			}
		}
		
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}
}

class Ourball{
	constructor(){
		this.radius = 20;
		this.coor = {x:-50, y:-50};
		this.speed= {x:.9, y:.9};
		this.node = document.createElement("div");
		this.node.setAttribute("class", "ourball");
		this.node.style.width = (2 * this.radius) + "px";
		this.node.style.height= this.node.style.width;
		this.node.style.backgroundColor = "#FFFFFF";
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}	
}
function Tomove_and_game_over_judgement(){	
	for(let i = 0; i < balls; i++){
		temi = i;
		aBall[i].move();
	}	
	//Judge whether game over!
	for (let i = 0; i < balls; i++){
		let temdistance = Math.sqrt( Math.pow( (bBall[0].coor.x + bBall[0].radius - aBall[i].coor.x - aBall[i].radius), 2) + Math.pow( (bBall[0].coor.y + bBall[0].radius - aBall[i].coor.y - aBall[i].radius), 2) );
		let radius_sum = bBall[0].radius + aBall[i].radius;
		if ( temdistance < radius_sum ) {
			point = point.toFixed(2);
			if(confirm("Game Over !!!\nYou have survived for " + point + " seconds~\nPlay one more time(y)?\nBack to the Homepage") ){
				//clearInterval(timer);
				window.location.href = "../game(mouse) position/game(mouse) position.html";
			}
			else{
				//clearInterval(timer);
				window.location.href = "../game/game.html";
			}
		}
	}
	//
	point += 0.01;
	count++;
	if(count == 500){
		count = 0;
		challenge();
	}
}
function challenge(){
	//challenge(level up)
	//new enemy ball
	balls++;
	ball_build_number = balls - 1;
	aBall.push(new Enemyball());
	container.appendChild(aBall[ball_build_number].node);
	//
	//enemy ball speed up
	for (let i = 0; i < balls; i++){
		aBall[i].speed.x += randint(-1, 2)/10;
		aBall[i].speed.y += randint(-1, 2)/10;
	}
	//our ball speed up
	let speedup = randint(1, 2)/10;
	bBall[0].speed.x += speedup;
	bBall[0].speed.y += speedup;
	//
	//
}
//

//main process code
var container = document.createElement("div");
container.setAttribute("id", "container");
document.body.appendChild(container);

var point = 0;
var count = 0;
var temi  = 0;
var balls = randint(7, 12);
var ball_build_number;
//Played ball build
var bBall = [];
bBall.push(new Ourball());
container.appendChild(bBall[0].node);
//
var aBall = [];
var jump_main = true;

function main(){
	//enemy ball build and move
	for (let n = 0; n < balls; n++){
		ball_build_number = n;
		aBall.push(new Enemyball());
		container.appendChild(aBall[ball_build_number].node);//最重要的一行
	}
	//
	let timer = setInterval(Tomove_and_game_over_judgement, 10);	
}
//

//Our ball moves depends on the position of mouse.
function run(e){
	e = e || window.event;
	if(e.clientX < 388) {
		bBall[0].coor.x = 0;
		bBall[0].node.style.left = bBall[0].coor.x + "px";
	}
	else if (e.clientX > 1148) {
		bBall[0].coor.x = 760;
		bBall[0].node.style.left = bBall[0].coor.x + "px"; 
	}
	else {
		bBall[0].coor.x = e.clientX - bBall[0].radius - 368;
		bBall[0].node.style.left = bBall[0].coor.x + "px";
	}
	
	if(e.clientY < 140) {
		bBall[0].coor.y = 0;
		bBall[0].node.style.top = bBall[0].coor.y + "px";
	}
	else if (e.clientY > 700){
		bBall[0].coor.y = 560;
		bBall[0].node.style.top = bBall[0].coor.y + "px"; 
	}
	else {
		bBall[0].coor.y = e.clientY - bBall[0].radius - 120;
		bBall[0].node.style.top = bBall[0].coor.y + "px";	
	}
	
	if(jump_main){
		jump_main = false;
		main();
	}
}
window.addEventListener("mousemove", run, false);	

