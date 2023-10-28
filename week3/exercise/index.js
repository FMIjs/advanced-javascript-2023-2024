// Task #1
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.getDistance = function(point2) {
  const dx = this.x - point2.x;
  const dy = this.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const point1 = new Point(0, 0);
const point2 = new Point(3, 4);

const distance = point1.getDistance(point2);
console.log(`The distance between point1 and point2 is ${distance}`);
console.log('\n\n\n');



// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---



// Task #2

function Circle(x, y, r) {
  Point.call(this, x, y);
  this.radius = r;
}

Circle.prototype = Object.create(Point.prototype);


Circle.prototype.getCircumference = function() {
  return 2 * Math.PI * this.radius;
};

Circle.prototype.getArea = function() {
  return Math.PI * this.radius * this.radius;
};

Circle.prototype.intersects = function(circle2) {
  const distance = this.getDistance(circle2);
  return distance < this.radius + circle2.radius;
};

// Example usage:
const circle1 = new Circle(0, 0, 5);
const circle2 = new Circle(6, 0, 3);
const circle3 = new Circle(10, 10, 3);

console.log(`Circumference of circle1: ${circle1.getCircumference()}`);
console.log(`Area of circle1: ${circle1.getArea()}`);
console.log(`Circle1 intersects with circle2: ${circle1.intersects(circle2)}`);
console.log(`Circle1 intersects with circle3: ${circle1.intersects(circle3)}`);
console.log(`Circle2 intersects with circle3: ${circle2.intersects(circle3)}`);
console.log('\n\n\n');



// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---



// Task #3

function Rectangle(x, y, a, b) {
  Point.call(this, x, y);
  this.sideA = a;
  this.sideB = b;
}

Rectangle.prototype = Object.create(Point.prototype);

Rectangle.prototype.getPerimeter = function() {
  return 2 * (this.sideA + this.sideB);
};

Rectangle.prototype.getArea = function() {
  return this.sideA * this.sideB;
};

Rectangle.prototype.getLengthOfDiagonals = function() {
  const diagonal1 = Math.sqrt(this.sideA ** 2 + this.sideB ** 2);
  const diagonal2 = diagonal1;
  return [diagonal1, diagonal2];
};

Rectangle.prototype.getBiggestCircle = function() {
  const centerX = this.x + this.sideA / 2;
  const centerY = this.y + this.sideB / 2;
  const radius = Math.min(this.sideA, this.sideB) / 2;

  return new Circle(centerX, centerY, radius);
};

// Example usage:
const rectangle = new Rectangle(0, 0, 6, 8);

console.log(`Perimeter of the rectangle: ${rectangle.getPerimeter()}`);
console.log(`Area of the rectangle: ${rectangle.getArea()}`);
console.log(`Lengths of diagonals: ${rectangle.getLengthOfDiagonals()}`);
const biggestCircle = rectangle.getBiggestCircle();
console.log(`Biggest Circle radius: ${biggestCircle.radius}`);
console.log('\n\n\n');



// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---



// Task #4

function RectanglePrism(x, y, a, b, c) {
  Rectangle.call(this, x, y, a, b);
  this.sideC = c;
}

RectanglePrism.prototype = Object.create(Rectangle.prototype);

RectanglePrism.prototype.getVolume = function() {
  return this.sideA * this.sideB * this.sideC;
};

// Example usage:
const rectangularPrism = new RectanglePrism(0, 0, 6, 8, 10);

console.log(`Volume of the rectangular prism: ${rectangularPrism.getVolume()}`);
console.log('\n\n\n');



// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---



// Task #5

const ColorMixin = {
  setColor(color) {
    this.color = color;
  },
  getColor() {
    return this.color;
  }
};

Object.assign(Point.prototype, ColorMixin);

const redPoint = new Point(1, 1);
const redCircle = new Circle(1, 1);
redPoint.setColor("red");
redCircle.setColor("red");

console.log(`The color of the point is ${redPoint.getColor()}`);
console.log(`The color of the circle is ${redCircle.getColor()}`);