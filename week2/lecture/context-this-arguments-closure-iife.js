var gen = getNaturalNumberGenerator(10);

console.log(gen(function inc(test) {
  console.log('>>', test++);
  console.log('>>', test);
  return test;
}));


function getNaturalNumberGenerator(counter) {
  counter = counter || 0; // this is actually a private variable
  return function naturalGenerator(processor) { // this is a closure (it locks counter variable)
    if (processor) { counter = processor(counter); }
    return counter++;
  };
}


console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());



// function getThisClosure(a) {
//   a = a || 0;
//   function thisIsClosure() {
//     return b + 10;
//   }
//   var b = 30;
//   return thisIsClosure;
// }

// var result = getThisClosure(10)();
// console.log(result);


// function myFunction(a, b, c) {
//   console.log(arguments);
// }

// myFunction(1);
[1, 2, 3].slice(0, 1); // > [1,2]
[1, 2, 3].slice(); // > [1, 2, 3]

function myFunction2(a, b) {
  console.log(this, a, b, arguments);
  var args = [].slice.call(arguments);
  console.log(Array.isArray(args), args);
}

myFunction2(1, 2, 344);
// myFunction2.call('Hello from call', 1, 2, 3);
// myFunction2.apply('Hello from apply', [1, 2, 3]);
// var myFunction3 = myFunction2.bind('Hello from bind', 1, 2);
// myFunction3(5, 6, 3);
// new myFunction2(1, 2, 344) // we will talk about this next time (this will set the this of the function to a new empty object ({}))

var context = {
  fun: myFunction2
};

context.fun(1, 2, 33);



function myObjectFactory(initialPrivateVariableValue) {
  var privateObjectVariable = initialPrivateVariableValue || 0;
  return {
    incrementPrivateVariable: function () {
      return privateObjectVariable++;
    }
  };
}

var result = myObjectFactory(100);
result.incrementPrivateVariable();
result.incrementPrivateVariable();
result.incrementPrivateVariable();
result.incrementPrivateVariable();

var myLib = (function (config) {
  var privateObjectVariable = config.value || 0;
  var api = {
    // expose what ever you want to be used
    incrementPrivateVariable: function () {
      return privateObjectVariable++;
    }
  };

  return api;
})({ value: 10 }); // IIFE

myLib.incrementPrivateVariable();
