function Person(firstName, lastName, birthDateString) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDateTimestamp = +(new Date(birthDateString));
}

Person.prototype.getFullName = function () {
  return this.firstName + ' ' + this.lastName;
};

function createPerson(firstName, lastName, birthDateString) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDateTimestamp = +(new Date(birthDateString));
}

function newSimulator() {
  var prototype = arguments[0];
  var ctor = arguments[1];
  var newContext = Object.create(prototype);
  ctor.apply(newContext, [].slice.call(arguments, 2));
  return newContext;
}

var createPersonPrototype = { log: function () { console.log(this); } }
var ivan = newSimulator(createPersonPrototype, createPerson, 'Ivan', 'Ivan', '2023-01-01');

ivan.log();

var ivan2 = new Person('Ivan', 'Ivan', '2023-01-01');
console.log(ivan2.getFullName());

Object.prototype.test = function () {
  console.log('Test');
};

Array.prototype.log = function () {
  console.log(this);
};

var myArray = [1, 2, 3];
// myArray.test = function() {

// };
myArray.log();
myArray.test();


/* Creating a longer prototypal chain */
function linkPrototypes() {
  for (var i = 1; i < arguments.length; i++) {
    let prev = arguments[i - 1]
    var curr = arguments[i];
    Object.setPrototypeOf(prev, curr);
  }
  return arguments[0];
}

var prot1 = { test1: function () { } };
var prot2 = { test2: 123 };
var prot3 = { test3: '555' };

var linkedPrototypes = linkPrototypes(prot1, prot2, prot3);

var extendedIvan = newSimulator(linkedPrototypes, createPerson, 'Ivan', 'Ivan', '2023-01-01');
console.log(extendedIvan.test3); // > "555"
console.log(prot1.test3); // > "555"
console.log(prot2.test3); // > "555"
console.log(prot3.test3); // > "555"


function Employee(fistName, lastName, birthDateString, position) {
  Person.call(this, fistName, lastName, birthDateString); // super(fistName, lastName, birthDateString);
  this.position = position;
}

Employee.prototype = Object.create(Person.prototype); // extends Person
// Employee.prototype = Person.prototype; < NO!

Employee.prototype.getPosition = function () {
  console.log(this.position);
};


var eIvan = new Employee('Ivan', 'Ivanov', '2023-10-10', 'Boss');

eIvan.getPosition();
eIvan.getFullName();
