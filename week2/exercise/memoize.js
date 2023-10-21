// We are still in ES5 environment so we use only ES5 functionalities

function memo(fn) {
  var NOT_FOUND = '**___not___found___**'; // using Symbol is better but it's ES6
  var cache = {
    // using a single weakMap that contains weakMaps with the given values is better for memory
    // or maybe you can consider WeakRef
    arguments: [],
    results: [],
    findPrecalculatedResultForArguments: function (searchArguments) {
      var argumentsMatch = this.arguments.find(function findHandler(currentArguments) {
        for (var key in currentArguments) {
          if (searchArguments[key] !== currentArguments[key]) { return false; }
        }
        return true;
      });
      var index = this.arguments.indexOf(argumentsMatch);
      if (index === -1) { return NOT_FOUND; }
      return this.results[index];
    },
    saveResult: function (arguments, result) {
      this.arguments.push(arguments);
      this.results.push(result);
    }
  };
  return function mem() {
    var cacheResult = cache.findPrecalculatedResultForArguments(arguments);
    if (cacheResult !== NOT_FOUND) { return cacheResult; }
    // this is something we can't prevent the context will be lost
    var result = fn.apply(undefined, arguments);
    cache.saveResult(arguments, result);
    return result;
  }
}

function sum(a, b, c) { return a + b + c };
var memoSum = memo(sum);

var res1 = memoSum(1, 2, 3);
var res2 = memoSum(2, 3, 1);
var res3 = memoSum(1, 2, 3);
console.log(res1, res2, res3);

function complexSum(a, b, c) { return a.value + b.value + c.value };
var memoComplexSum = memo(complexSum);

var arg1 = { value: 1 };
var arg2 = { value: 2 };
var arg3 = { value: 3 };

var complexRes1 = memoComplexSum(arg1, arg2, arg3);
var complexRes2 = memoComplexSum(arg2, arg1, arg2);
var complexRes3 = memoComplexSum(arg1, arg2, arg3);
console.log(complexRes1, complexRes2, complexRes3);














function mySuperCoolFunction(notVeryCoolArgument) {
  return this.myNotVeryCoolValue + notVeryCoolArgument;
}

var mySuperCoolObject = {
  myNotVeryCoolValue: 1,
  mySuperCoolMethod: mySuperCoolFunction
}

var mySuperCoolMethodThatIsNotAMethodAnymore = memo(mySuperCoolObject.mySuperCoolMethod);
var result1 = mySuperCoolMethodThatIsNotAMethodAnymore(10); // ????

mySuperCoolObject.mySuperCoolMethod = mySuperCoolMethodThatIsNotAMethodAnymore;
var result2 = mySuperCoolObject.mySuperCoolMethod(10) // ????

mySuperCoolObject.mySuperCoolMethod = mySuperCoolMethodThatIsNotAMethodAnymore.bind(mySuperCoolObject);
var result3 = mySuperCoolObject.mySuperCoolMethod(10) // ????

mySuperCoolObject.mySuperCoolMethod = mySuperCoolFunction.bind(mySuperCoolObject);
var result4 = memo(mySuperCoolObject.mySuperCoolMethod)(10)

console.log(result1, result2, result3, result4);



var obj = {
  val: 1,
  myFunc: function() {
    return this.val;
  }
}

function lib(config) {
  
  return config.fn;
  return {
    operator: config.fn
  };
}

const myLib = lib(obj.myFunc)
myLib.operator();