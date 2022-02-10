function randint(start, end){
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

class Ball{
	constructor(){
		this.radius = randint(10, 50);
		if (initial_balls == balls) this.coor = {x:randint(0, 600), y:randint(10, 400)};
		else{
			if (bBall[0].coor.x < 400) this.coor = {x:randint(500, 700), y:randint(10, 400)};
			else this.coor = {x:randint(100, 300), y:randint(10, 400)};
		}
		this.speed= {x:randint(3, 7) , y:randint(3, 7)};
		let  directionx=randint(0, 1);
		if(directionx < 0.5) this.speed.x = -this.speed.x;
		let  directiony=randint(0, 1);
		if(directiony < 0.5) this.speed.y = -this.speed.y;
		
		this.node = document.createElement("div");
		this.node.setAttribute("class", "ball");
		this.node.style.width = (2 * this.radius) + "px";
		this.node.style.height= this.node.style.width;
		this.node.style.backgroundColor = "rgba(" + randint(80, 255) + ", " + randint(80, 255) + ", " + randint(80, 255) + ", " + .7 + ")";
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}
	move(){
		// image one time to let the touching more reasonable
		this.coor.x += this.speed.x;
		this.coor.y += this.speed.y;
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
		//
		// x
		if (this.coor.x > (800 - 2 * this.radius) || this.coor.x < 0){
			this.speed.x = -this.speed.x;
			this.coor.x += this.speed.x;
		}
		//add if to let ball will go back after touching another ball
		else{
			for (let n = 0; n < balls; n++){
				let distance = Math.sqrt( Math.pow( (this.coor.x + this.radius - aBall[n].coor.x - aBall[n].radius), 2) + Math.pow( (this.coor.y + this.radius - aBall[n].coor.y - aBall[n].radius), 2) );
				let min_accept_distance = this.radius + aBall[n].radius;
				if ( (temi != n) && (min_accept_distance >= distance) ){
					if ( (this.speed.x > 0 && aBall[n].speed.x < 0) || (this.speed.x < 0 && aBall[n].speed.x > 0)){
						this.speed.x = -this.speed.x;
						aBall[n].speed.x = -aBall[n].speed.x;
					}
					else if (this.speed.x > 0 && aBall[n].speed.x > 0){
						if (this.coor.x + this.radius < aBall[n].coor.x + aBall[n].radius){
							let tem = this.speed.x;
							this.speed.x = -aBall[n].speed.x;
							aBall[n].speed.x = tem;
						}
						else if (this.coor.x + this.radius > aBall[n].coor.x + aBall[n].radius){
							let tem = aBall[n].speed.x;
							aBall[n].speed.x = -this.speed.x;
							this.speed.x = tem;
						}
					}
					else if (this.speed.x < 0 && aBall[n].speed.x < 0){
						if (this.coor.x + this.radius < aBall[n].coor.x + aBall[n].radius){
							let tem = aBall[n].speed.x;
							aBall[n].speed.x = -this.speed.x;
							this.speed.x = tem;
						}
						else if (this.coor.x + this.radius > aBall[n].coor.x + aBall[n].radius){
							let tem = this.speed.x;
							this.speed.x = -aBall[n].speed.x;
							aBall[n].speed.x = tem;
						}
					}
					//this.speed.x == 0 || aBall[n].speed.x == 0
					else if (this.speed.x == 0 && aBall[n].speed.x != 0){
						this.speed.x = aBall[n].speed.x;
						aBall[n].speed.x = -aBall[n].speed.x;
					}
					else{
						aBall[n].speed.x = this.speed.x;
						this.speed.x = -this.speed.x;
					}
					//
					this.coor.x += this.speed.x;
					aBall[n].coor.x += aBall[n].speed.x;
				}
			}
		}
		//
		//
		//y
		if (this.coor.y > (600 - 2 * this.radius) || this.coor.y < 0){
			this.speed.y = -this.speed.y;
			this.coor.y += this.speed.y;
		}
		//add if to let ball will go back after touching another ball
		else{
			for (let n = 0; n < balls; n++){
				let distance = Math.sqrt( Math.pow( (this.coor.x + this.radius - aBall[n].coor.x - aBall[n].radius), 2) + Math.pow( (this.coor.y + this.radius - aBall[n].coor.y - aBall[n].radius), 2) );
				let min_accept_distance = this.radius + aBall[n].radius;
				if ( (temi != n) && (min_accept_distance >= distance) ){
					if ( (this.speed.y > 0 && aBall[n].speed.y < 0) || (this.speed.y < 0 && aBall[n].speed.y > 0)){
						this.speed.y = -this.speed.y;
						aBall[n].speed.y = -aBall[n].speed.y;
					}
					else if (this.speed.y > 0 && aBall[n].speed.y > 0){
						if (this.coor.y + this.radius < aBall[n].coor.y + aBall[n].radius){
							let tem = this.speed.y;
							this.speed.y = -aBall[n].speed.y;
							aBall[n].speed.y = tem;
						}
						else if (this.coor.y + this.radius > aBall[n].coor.y + aBall[n].radius){
							let tem = aBall[n].speed.y;
							aBall[n].speed.y = -this.speed.y;
							this.speed.y = tem;
						}
					}
					else if (this.speed.y < 0 && aBall[n].speed.y < 0){
						if (this.coor.y + this.radius < aBall[n].coor.y + aBall[n].radius){
							let tem = aBall[n].speed.y;
							aBall[n].speed.y = -this.speed.y;
							this.speed.y = tem;
						}
						else if (this.coor.y + this.radius > aBall[n].coor.y + aBall[n].radius){
							let tem = this.speed.y;
							this.speed.y = -aBall[n].speed.y;
							aBall[n].speed.y = tem;
						}
					}
					//this.speed.y == 0 || aBall[n].speed.y == 0
					else if (this.speed.y == 0 && aBall[n].speed.y != 0){
						this.speed.y = aBall[n].speed.y;
						aBall[n].speed.y = -aBall[n].speed.y;
					}
					else{
						aBall[n].speed.y = this.speed.y;
						this.speed.y = -this.speed.y;
					}
					//
					this.coor.y += this.speed.y;
					aBall[n].coor.y += aBall[n].speed.y;
				}
			}
		}
		//
		//
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}
}

class PlayBall{
	constructor(){
		this.radius = 20;
		this.coor = {x:750, y:550};
		this.speed= {x:8, y:8};
		this.node = document.createElement("div");
		this.node.setAttribute("class", "playball");
		this.node.style.width = (2 * this.radius) + "px";
		this.node.style.height= this.node.style.width;
		this.node.style.backgroundColor = "#FFFFFF";
		this.node.style.left = this.coor.x + "px";
		this.node.style.top  = this.coor.y + "px";
	}	
}

var container = document.createElement("div");
container.setAttribute("id", "container");
document.body.appendChild(container);

var point = 0;
var count = 0;
var temi  = 0;
//enemy ball build and move
var aBall = [];
var balls = 7;
var initial_balls = balls;
for (var i = 0; i < balls; i++){
	aBall.push(new Ball());
	container.appendChild(aBall[i].node);				//最重要的一行
}
//
function go(){
	//challenge(level up)
	count++;
	point += 0.1;
	if (count >= 50){
		count = 0;
		//new enemy ball
		balls++;
		aBall.push(new Ball());
		container.appendChild(aBall[balls - 1].node);
		//
		//enemy ball speed up
		for (let i = 0; i < balls; i++){
			aBall[i].speed.x += randint(-1, 3);
			aBall[i].speed.y += randint(-1, 3);
		}
		//our ball speed up
		bBall[0].speed.x += randint(2, 3);
		bBall[0].speed.y += randint(2, 3);
		//
		//
	}
	//
	for (let i = 0; i < balls; i++){
		//Judge whether game over!
		let temdistance = Math.sqrt( Math.pow( (bBall[0].coor.x + bBall[0].radius - aBall[i].coor.x - aBall[i].radius), 2) + Math.pow( (bBall[0].coor.y + bBall[0].radius - aBall[i].coor.y - aBall[i].radius), 2) );
		if ( temdistance < (bBall[0].radius + aBall[i].radius) ) {
			point -= 0.1;
			point = point.toFixed(1);
			if(confirm("Game Over !!!\nYou have survived for " + point + " seconds~\nPlay one more time(y)?\nBack to the Homepage") ){
				clearInterval(timer);
				window.location.href = "game.html";
			}
			else{
				clearInterval(timer);
				window.location.href = "../../enter/enter.html";
			}
		}
		//
		temi = i;
		aBall[i].move();
	}	
}
//
//Played ball build
var bBall = [];
bBall.push(new PlayBall());
container.appendChild(bBall[0].node);
//
let timer = setInterval(go, 100);

//Our ball moves with no keypress delay
var pleasel, pleaser, pleaseu, pleased;
var booll = true, boolr = true, boolu = true, boold = true;
var please;
//keydown move
function aleft(){
	if(bBall[0].coor.x > 0) 	bBall[0].coor.x -= bBall[0].speed.x;
	else 						bBall[0].coor.x = 0;
	bBall[0].node.style.left = bBall[0].coor.x + "px";
	bBall[0].node.style.top  = bBall[0].coor.y + "px";	
}
function aright(){
	if(bBall[0].coor.x < (800 - bBall[0].radius * 2) ) 	bBall[0].coor.x += bBall[0].speed.x;
	else bBall[0].coor.x = 800 - bBall[0].radius * 2;
	bBall[0].node.style.left = bBall[0].coor.x + "px";
	bBall[0].node.style.top  = bBall[0].coor.y + "px";	
}
function aup(){
	if(bBall[0].coor.y > 0 ) 	bBall[0].coor.y -= bBall[0].speed.y;
	else bBall[0].coor.y = 0;
	bBall[0].node.style.left = bBall[0].coor.x + "px";
	bBall[0].node.style.top  = bBall[0].coor.y + "px";	
}
function adown(){
	if(bBall[0].coor.y < (600 - bBall[0].radius * 2) ) 	bBall[0].coor.y += bBall[0].speed.y;
	else bBall[0].coor.y = 600 - bBall[0].radius * 2;
	bBall[0].node.style.left = bBall[0].coor.x + "px";
	bBall[0].node.style.top  = bBall[0].coor.y + "px";	
}
//
//start setInterval in keydown
function run(e){
	e = e||window.event;
	switch(e.code){
		case "ArrowLeft" :
			if (booll){
				if(boolr && boolu && boold) aleft();
				//If press multiple key in the same time, ensure the moving path is stright. (By make all keydown setInterval in almost the same time.)
				if(!boolr){
					please = clearInterval(pleaser);
					pleaser = setInterval(aright, 100);
				}
				if(!boolu){
					please = clearInterval(pleaseu);
					pleaseu = setInterval(aup, 100);
				}
				if(!boold){
					please = clearInterval(pleased);
					pleased = setInterval(adown, 100);
				}
				//
				pleasel = setInterval(aleft, 100);
				booll = false;
			}
			break;
		case "ArrowRight" :
			if (boolr){
				if(booll && boolu && boold) aright();
				//If press multiple key in the same time, ensure the moving path is stright. (By make all keydown setInterval in almost the same time.)
				if(!booll){
					please = clearInterval(pleasel);
					pleasel = setInterval(aleft, 100);
				}
				if(!boolu){
					please = clearInterval(pleaseu);
					pleaseu = setInterval(aup, 100);
				}
				if(!boold){
					please = clearInterval(pleased);
					pleased = setInterval(adown, 100);
				}
				//
				pleaser = setInterval(aright, 100);
				boolr = false;
			}
			break;		
		case "ArrowUp" :
			if (boolu){
				if(booll && boolr && boold) aup();
				//If press multiple key in the same time, ensure the moving path is stright. (By make all keydown setInterval in almost the same time.)
				if(!boolr){
					please = clearInterval(pleaser);
					pleaser = setInterval(aright, 100);
				}
				if(!booll){
					please = clearInterval(pleasel);
					pleasel = setInterval(aleft, 100);
				}
				if(!boold){
					please = clearInterval(pleased);
					pleased = setInterval(adown, 100);
				}
				//
				pleaseu = setInterval(aup, 100);
				boolu = false;
			}
			break;
		case "ArrowDown" :
			if (boold){
				if(booll && boolr && boolu) adown();
				//If press multiple key in the same time, ensure the moving path is stright. (By make all keydown setInterval in almost the same time.)
				if(!boolr){
					please = clearInterval(pleaser);
					pleaser = setInterval(aright, 100);
				}
				if(!boolu){
					please = clearInterval(pleaseu);
					pleaseu = setInterval(aup, 100);
				}
				if(!booll){
					please = clearInterval(pleasel);
					pleasel = setInterval(aleft, 100);
				}
				//
				pleased = setInterval(adown, 100);
				boold = false;
			}
			break;
	}
}
//
//stop setInterval when keyup
function runup(e){
	e = e||window.event;
	switch(e.code){
		case "ArrowLeft" :	
			please = clearInterval(pleasel);
			booll = true;
			break;
		case "ArrowRight" :
			please = clearInterval(pleaser);
			boolr = true;
			break;		
		case "ArrowUp" :
			please = clearInterval(pleaseu);
			boolu = true;
			break;	
		case "ArrowDown" :
			please = clearInterval(pleased);
			boold = true;
			break;
	}
}
//
window.addEventListener("keydown", run, false);
window.addEventListener("keyup", runup, false);
//