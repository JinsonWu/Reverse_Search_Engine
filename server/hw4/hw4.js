class Shape {
    constructor(name, sides, sideLength) {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength;
    }
    calcPerimeter (){
        console.log(this.sides * this.sideLength);
    }
}

class Square extends Shape{
    constructor(x) {
        super("square", 4, x);
    }

    calcArea(){
        console.log(this.sideLength ** 2);
    }

}


var square = new Shape("square", 4, 5);
square.calcPerimeter();

var triangle = new Shape("square", 3, 3);
triangle.calcPerimeter();

var squareArea = new Square(5);
squareArea.calcArea();