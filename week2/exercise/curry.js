function curry(fn) {
  var arity = fn.length;
  var args = [];
  return function helper() {
    args = args.concat([].slice.call(arguments));
    if (args.length >= arity) {
      try {
        return fn.apply(undefined, args);
      } finally {
        args = [];
      }
    }
    return helper;
  }
}

function test(a, b, c) {
  return a + b + c;
}

var cTest = curry(test);

var result1 = cTest(1)(2)(3);
var result2 = cTest(1)(1)(2);

console.log(result1, result2);

