class PlayBall{
	constructor(){
		this.radius = 20;
		this.coor = {x:-50, y:-50};
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
//Played ball build
var bBall = [];
bBall.push(new PlayBall());
container.appendChild(bBall[0].node);
//

function run(e){
	e = e || window.event;
	if(e.clientX < 388) bBall[0].node.style.left = 0 + "px";
	else if (e.clientX > 1148) bBall[0].node.style.left = 760 + "px"; 
	else bBall[0].node.style.left = (e.clientX - bBall[0].radius - 368) + "px";
	
	if(e.clientY < 140) bBall[0].node.style.top = 0 + "px";
	else if (e.clientY > 700) bBall[0].node.style.top = 560 + "px"; 
	else bBall[0].node.style.top = (e.clientY - bBall[0].radius - 120) + "px";	
}
window.addEventListener("mousemove", run, false);

function jump(e){
	e = e || window.event;
	switch(e.button){
		case 0:	
			if(e.clientX < 368 || e.clientX > 1168 || e.clientY < 120 || e.clientY > 720) alert("Please click in the matte black space!!!");
			else window.location.href = "../game(mouse)/game(mouse).html";
	
	
	}
}
window.addEventListener("click", jump, false);