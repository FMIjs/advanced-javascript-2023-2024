function containerSum(obj) {
  var sum = 0;
  for (var a in obj) {
    sum += obj[a];
  }
  return sum;
}

function isContainer(a) {
  return a instanceof Array ||
    (typeof a === 'object' && a !== null);
}

function sum(a, b) {
  var sum = 0;
  if (isContainer(a)) {
    sum += containerSum(a);
  } else {
    sum += a;
  }

  if (isContainer(b)) {
    sum += containerSum(b);
  } else {
    sum += b;
  }
  // a[3213] = 231;
  return sum;
}

var obj = { prop1: 1, prop2: 100 };
var result = sum(obj, [1, 2, 3]);
console.log(obj);
console.log(result);

// var obj = {
//   prop1: 100,
//   prop2: 200,
//   prop3: [],
//   prop4: '300'
// };

// var sum = 0;


// console.log(sum);

// // var arr = [1, 2, 3, 4];
// // var sum = 0;

// // for (var i = 0; i < arr.length; i++) {
// //   sum += arr[i];
// // }

// // console.log(sum);