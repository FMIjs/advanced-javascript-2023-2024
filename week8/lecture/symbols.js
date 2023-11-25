// Global registry symbols
// const s1 = Symbol.for('test');
// const s2 = Symbol.for('test');

// const obj = {
//   [s1]() {
//     console.log('Hello from my cool method')
//   },
//   regularMethod() {
//     console.log('Hello from my not so cool method')
//   }
// }
// obj.regularMethod();
// obj['regularMethod']();
// obj[Symbol.for('test')]();

// console.log(Object.keys(obj));
// console.log(Object.getOwnPropertySymbols(obj));

// const a1 = Symbol('TEST');
// const a2 = Symbol('TEST');

// const a3 = 'Test';
// const a4 = 'Test';

// console.log(a1 === a2);

// const obj = {
//   a: 1,
//   b: 2,
//   c: 3,

//   [Symbol.iterator]() {
//     let counter = 0;

//     const next = () => {
//       const entries = Object.entries(this);
//       const done = counter === entries.length;
//       const value = entries[counter++];
//       return { value, done };
//     };


//     return { next };
//   }
// };

// for (const a of obj) {
//   console.log(a);
// }

// const myNewObj = { ...obj };
// const myNewObjArray = [...obj];
// console.log(myNewObj, myNewObjArray);

const obj = {
  a: 1,
  b: 2,
  c: 3,

  // [Symbol.iterator]: function* () {

  // }
  *[Symbol.iterator]() {
    let entries = Object.entries(this);
    let counter = 0
    while (counter !== entries.length) {
      yield entries[counter++];
      entries = Object.entries(this);
    }
  }
  //   [Symbol.iterator]() {
  //     let counter = 0;
  //     const next = () => {
  //       const entries = Object.entries(this);
  //       const done = counter === entries.length;
  //       const value = entries[counter++];
  //       return { value, done };
  //     };
  //     return { next };
  //   }
};

// const inter = obj[Symbol.iterator]();

// console.log(inter.next());
// obj.d = 1000;
// setTimeout(() => {
//   console.log(inter.next());
//   console.log(inter.next());
//   console.log(inter.next());
//   console.log(inter.next());
//   console.log(inter.next());
//   console.log(inter.next());
//   console.log(inter.next());
// });


// for (const a of obj) {
//   console.log(a);
// }


function* gen() {
  let counter = 0;

  while (true) {
    const newCounter = yield counter++;
    counter = typeof newCounter === 'number' ? newCounter : counter;
  }
}

const iter = gen();

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next(0));
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

