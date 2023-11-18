function identity(a) { return a; }
const id = a => a;

const idObj = ({ a }) => ({ a });

const swap = ([a, b]) => [b, a];

swap([1, 2, 3, 4, 4]) // > [2, 1]

const obj1 = {
  test: 123,
  getTest: function () {
    return this.test;
  }.bind(this)
}

const obj = {
  test: 123,
  getTest: () => {
    return this.test;
  }
}

console.log(obj.getTest());


function Person(name, age) {
  this.name = name;
  this.age = age;

  // 
  // this.getName = function () {
  //   return this.name;
  // }.bind(this);

  this.getName = () => {
    return this.name;
  };
}

const ivan = new Person('Ivan', 29);
const pesho = new Person('Pesho', 29);

pesho.getName = ivan.getName;

console.log(pesho.getName());
