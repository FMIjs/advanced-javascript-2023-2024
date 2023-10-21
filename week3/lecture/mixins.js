/* MIXINS */

var commonLogic = {
  getName: function () {
    return (this.name || this.firstName) +
      (this.lastName ? ' ' + this.lastName : '');
  },
  getAge: function () {
    const ageInMilliseconds = +(new Date()) - this.birthDateTimestamp;
    return ageInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  },
}

var employeeLogic = {
  setSalary: function (startDateString, salary) {
    this.employeeHistory = this.employeeHistory || [];
    this.employeeHistory.push({
      startDateTimestamp: +(new Date(startDateString)),
      salary: salary
    })
  },
  getCurrentSalary: function () {
    this.employeeHistory = this.employeeHistory || [];
    return this.employeeHistory[this.employeeHistory.length - 1] || null;
  },
  getPreviousSalary: function () {
    this.employeeHistory = this.employeeHistory || [];
    return this.employeeHistory[this.employeeHistory.length - 2] || null;
  }
}

function createPerson(firstName, lastName, birthDateString) {
  return {
    firstName: firstName,
    lastName: lastName,
    birthDateTimestamp: +new Date(birthDateString),
    test: function () {
      console.log('test');
    }
  };
}

function createDog(name, birthDateString) {
  return {
    name: name,
    birthDateTimestamp: +new Date(birthDateString)
  };
}

function copyObjectProps(source, target) {
  target = target || {};
  for (var prop in source) {
    target[prop] = source[prop];
  }
  return target;
}

function mixin() {
  var target = copyObjectProps(arguments[0]);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    copyObjectProps(source, target);
  }
  return target;
}

var ivan = createPerson('Ivan', 'Ivanov', '2022-01-01');
var ivan2 = createPerson('Ivan2', 'Ivanov2', '2021-01-01');
var myDog = createDog('Bari', '2023-01-01');

console.log(ivan2.getAge === ivan.getAge);
// > true (we are using the same function instance)
console.log(ivan.test === ivan2.test);
// > false (because we are creating a new function every time the factory is called)

var extendedIvan = mixin(ivan, commonLogic, employeeLogic);
var extendedDog = mixin(myDog, commonLogic);

// var ivanAge = ivan.getAge(); // > undefined is not a function error
var ivanAge = extendedIvan.getAge();
var myDogAge = extendedDog.getAge();
var ivanFullName = extendedIvan.getName();
var myDogName = extendedDog.getName();

console.log(ivanAge, myDogAge, ivanFullName, myDogName);
