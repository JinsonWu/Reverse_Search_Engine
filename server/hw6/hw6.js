/*
class Brick{
	constructor(){
		this.value = document.createTextNode("0");
		this.node = document.createElement("div");
		this.node.appendChild(this.value);
		this.setAttribute("class", "brick");
		//this.value.nodeValue
	}
}*/
const BLANK = " "; 
function Brick(){	
	this.ABCnode = document.createTextNode(" ");
	this.node = document.createElement("div");
	this.node.setAttribute("class", "brick");
	this.node.appendChild(this.ABCnode);
}
Brick.prototype.setBrick = function(i){
	this.ABCnode.nodeValue = i;
	this.node.setAttribute("class", "brick brick"+i);
}
Brick.prototype.getBrick = function(){
	return this.ABCnode.nodeValue;
}

function randomTile(){
	let aTmp = [], i;
	for (let i = 0; i < 16; i++){
		if (aBrick[i].getBrick()===BLANK) aTmp.push(i);
	}
	i = Math.floor(Math.random()*aTmp.length);
	aBrick[aTmp[i]].setBrick(Math.random() < 0.75?2:4);
}

let aBrick = [];
let container = document.getElementById("container");
for (let i = 0; i < 16; i++){
	aBrick.push(new Brick());
	container.appendChild(aBrick[i].node);				//最重要的一行
}

randomTile();
randomTile();

function run(e){
	let gameover = true, forceMove = false;
	let signal = [];//紀錄有無被加過，避免連加
	for (let i = 0; i <= 15; i++){
		signal[i] = true;
	}
	var randomgive = false;//若e.code無法使brick移動，則flase, 反之則為true。作為後面決定是否給random位置值的依據
	switch(e.code){
		case "ArrowLeft" :
			for (let i = 0; i <= 15; i++){
				if((i % 4)!=0){
					if(aBrick[i].getBrick() !== BLANK ){
						for (let j = i; j >= 0; j--){
							if ((j % 4) != 0){
								if (aBrick[j-1].getBrick() === BLANK){
									aBrick[j-1].setBrick(aBrick[j].getBrick());
									aBrick[j].setBrick(BLANK);
									randomgive = true;
									gameover = false;
								}
								else if (aBrick[j-1].getBrick() === aBrick[j].getBrick() && signal[j-1]){
									aBrick[j-1].setBrick(parseInt(aBrick[j-1].getBrick()) * 2);	
									aBrick[j].setBrick(BLANK);
									signal[j-1] = false;
									randomgive = true;
									gameover = false;
									break;
								}
								else{
									break;
								}
							}
							else{
								break;
							}
						}
					}
					else{
						gameover = false;
					}
				}
			}
			break;
		case "ArrowRight":
			for (let i = 15; i >= 0; i--){
				if((i % 4)!=3){
					if(aBrick[i].getBrick() !== BLANK ){
						for (let j = i; j <= 15; j++){
							if ((j % 4) != 3){
								if (aBrick[j+1].getBrick() === BLANK){
									aBrick[j+1].setBrick(aBrick[j].getBrick());
									aBrick[j].setBrick(BLANK);
									gameover = false;
									randomgive = true;
								}
								else if (aBrick[j+1].getBrick() === aBrick[j].getBrick() && signal[j+1]){
									aBrick[j+1].setBrick(parseInt(aBrick[j+1].getBrick()) * 2);	
									aBrick[j].setBrick(BLANK);
									signal[j+1] = false;
									gameover = false;
									randomgive = true;
									break;
								}
								else{
									break;
								}
							}
							else{
								break;
							}
						}
					}
					else{
						gameover = false;
					}
				}
			}
			break;
		case "ArrowUp"   :
			for (let i = 4; i <= 15; i++){
				if(aBrick[i].getBrick() !== BLANK ){
					for (let j = i; j >= 4; j-=4){
						if (aBrick[j-4].getBrick() === BLANK){
							aBrick[j-4].setBrick(aBrick[j].getBrick());
							aBrick[j].setBrick(BLANK);
							gameover = false;
							randomgive = true;
						}
						else if (aBrick[j-4].getBrick() === aBrick[j].getBrick() && signal[j-4]){
							aBrick[j-4].setBrick(parseInt(aBrick[j-4].getBrick()) * 2);	
							aBrick[j].setBrick(BLANK);
							signal[j-4] = false;
							gameover = false;
							randomgive = true;
							break;
						}
						else{
							break;
						}
					}
				}
				else{
					gameover = false;
				}
			}
			break;
		case "ArrowDown" :
			for (let i = 11; i >= 0; i--){
				if(aBrick[i].getBrick() !== BLANK ){
					for (let j = i; j <= 11; j+=4){
						if (aBrick[j+4].getBrick() === BLANK){
							aBrick[j+4].setBrick(aBrick[j].getBrick());
							aBrick[j].setBrick(BLANK);
							gameover = false;
							randomgive = true;
						}
						else if (aBrick[j+4].getBrick() === aBrick[j].getBrick() && signal[j+4]){
							aBrick[j+4].setBrick(parseInt(aBrick[j+4].getBrick()) * 2);	
							aBrick[j].setBrick(BLANK);
							signal[j+4] = false;
							gameover = false;
							randomgive = true;
							break;
						}
						else{
							break;
						}
					}
				}
				else{//i is blank
					gameover = false;
				}
			}
			break;
	}
	
	if (!gameover){
		for (let i = 0; i < 16; i++){
			if(parseInt(aBrick[i].getBrick()) >= 2048){
				window.removeEventListener("keydown", run, false);
				console.log("Congradulation!!!");
			}
		}
		if(randomgive) randomTile();
	}

	else{
		let flagend = true;
		for (let i = 0; i <= 15; i++){
			//角落
			if (i == 0){
				if (aBrick[i].getBrick() == aBrick[i+1].getBrick() || aBrick[i].getBrick() == aBrick[i+4].getBrick()) flagend = false;
			}
			else if (i == 3){
				if (aBrick[i].getBrick() == aBrick[i-1].getBrick() || aBrick[i].getBrick() == aBrick[i+4].getBrick()) flagend = false;
			}
			else if (i == 12){
				if (aBrick[i].getBrick() == aBrick[i+1].getBrick() || aBrick[i].getBrick() == aBrick[i-4].getBrick()) flagend = false;
			}
			else if (i == 15){
				if (aBrick[i].getBrick() == aBrick[i-1].getBrick() || aBrick[i].getBrick() == aBrick[i-4].getBrick()) flagend = false;
			}
			//
			//邊上的
			else if (i == 1 || i == 2){
				if (aBrick[i].getBrick() == aBrick[i-1].getBrick() || aBrick[i].getBrick() == aBrick[i+1].getBrick() || aBrick[i].getBrick() == aBrick[i+4].getBrick()) flagend = false;
			}
			else if (i == 4 || i == 8){
				if (aBrick[i].getBrick() == aBrick[i-4].getBrick() || aBrick[i].getBrick() == aBrick[i+1].getBrick() || aBrick[i].getBrick() == aBrick[i+4].getBrick()) flagend = false;
			}
			else if (i == 7 || i == 11){
				if (aBrick[i].getBrick() == aBrick[i-4].getBrick() || aBrick[i].getBrick() == aBrick[i-1].getBrick() || aBrick[i].getBrick() == aBrick[i+4].getBrick()) flagend = false;
			}
			else if (i == 13 || i == 14){
				if (aBrick[i].getBrick() == aBrick[i-1].getBrick() || aBrick[i].getBrick() == aBrick[i+1].getBrick() || aBrick[i].getBrick() == aBrick[i-4].getBrick()) flagend = false;
			}
			//
			//中間的
			else{
				if (aBrick[i].getBrick() == aBrick[i-1].getBrick() || aBrick[i].getBrick() == aBrick[i+1].getBrick() || aBrick[i].getBrick() == aBrick[i-4].getBrick() || aBrick[i].getBrick() == aBrick[i+4].getBrick()) flagend = false;
			}
			//
		}
		if (flagend){
			console.log("Game Over!!!");
			window.removeEventListener("keydown", run, false);	
		}
		else{
			console.log("Still can work, try it in another way!!!");
		}
	}
	

}
window.addEventListener("keydown", run, false);



