// function iteratorFactory(iteratorData) {
//   let counter = 0;

//   return {
//     next() {
//       const completed = counter === iteratorData.length;
//       if (completed) return { value: null, completed };
//       const value = iteratorData[counter++];
//       return { value, completed };
//     }
//   };
// }

// const iter = iteratorFactory([1, 2, 3]);
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// function* genFactory() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
// }

// const g = genFactory();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());


function iteratorFactory(iteratorData) {
  return (function* () {
    let counter = 0;
    while (counter < iteratorData.length) {
      yield iteratorData[counter++];
    }
  })();
}

const iter = iteratorFactory([1, 2, 3]);
console.log(iter.next());
setTimeout(() => {
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
}, 5000);
