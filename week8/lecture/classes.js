// function Person(name, age) {
//   Object.defineProperty(this, 'name', { get() { return name; } });
//   Object.defineProperty(this, 'age', { get() { return age; } });
// }

// Person.prototype.somePersonFunctionality = function () {
//   console(this.name, this.age);
// };

// function Employee(name, age, position) {
//   Person.call(this, name, age); // super(name, age);
//   this.position = position;
// }

// Employee.prototype = Object.create(Person.prototype); // extends Person

// Employee.prototype.someEmployeeFunctionality = function () {
//   console(this.name, this.age, this.position);
// }

// const a = new Employee('a', 20);
// a.somePersonFunctionality();


class Person {
  #privateVar = 10;
  constructor(name, age) {
    Object.defineProperty(this, 'name', { get() { return name; } });
    Object.defineProperty(this, 'age', { get() { return age; } });
    this.#privateVar = 20;
  }
  somePersonFunctionality() {
    console(this.name, this.age);
  }
}

class Employee extends Person {
  constructor(name, age, position) {
    super(name, age);
    this.position = position;
  }
  someEmployeeFunctionality() {
    console(this.name, this.age, this.position);
  }
}

const e = new Employee('a', 20, 'a');

for (const a of e) {
  
}