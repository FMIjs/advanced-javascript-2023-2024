// for (var i = 0; i < 5; i++) {
//   // (function (j) {
//   //   setTimeout(function () {
//   //     console.log(j);
//   //   });
//   // }(i));
//   setTimeout(function (j) {
//     return function () {
//       console.log(j);
//     };
//   }(i));
// }

// setTimeout(function (i) { console.log(i); }, 100, 20);
// setInterval()
// var counter = 0;
// setInterval(function () {
//   console.log(counter++);
// }, 1000);

setTimeout(function () {
  console.log('setTimeout');
});

process.nextTick(function () {
  console.log('nextTick 1');
});
process.nextTick(function () {
  console.log('nextTick 2');
});
process.nextTick(function () {
  console.log('nextTick 3');
});
