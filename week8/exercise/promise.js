// these are the test cases that our promise should cover

const normalPromise = new Promise((resolve, reject) => {
  resolve('Success');
});
normalPromise.then((value) => {
  console.log(value);
});
// ==> `Success`

normalPromise.then((value) => {
  console.log(`chain #1, ${value}`);
  return normalPromise
}).then((value) => {
  console.log(`chain #2, ${value}`);
  return normalPromise
}).then((value) => {
  console.log(`chain #3, ${value}`);
});
// ==> `chain #1, Success`,
//     `chain #2, Success`,
//     `chain #3, Success`



const rejectPromise = new Promise((resolve, reject) => {
  reject('Fail');
});
rejectPromise.then((value) => {
  console.log(value);
}).catch((value) => {
  console.log(`Got error ${value}`);
});
// ==> `Got error Fail`


rejectPromise.then((value) => {
  console.log(`then #1 , ${value}`);
  return normalPromise;
}).then((value) => {
  console.log(`then #2, ${value}`);
  return normalPromise;
}).then((value) => {
  console.log(`then #3, ${value}`);
  return normalPromise;
}).then((value) => {
  console.log(`then #4, ${value}`);
  return normalPromise;
}).catch((value) => {
  console.log(`Got error ${value}`);
  return normalPromise;
}).then((value) => {
  console.log(`then #5, ${value}`);
});
// ==> `Got error Fail`
//     `then #5, Success`

const pr = new Promise((resolve, reject) => {
  throw new Error('Fail');
  resolve('test');
});
pr.then((value) => {
  console.log(value);
}).catch((value) => {
  console.log(`Got error ${value}`);
});
// ==> `Got error Fail`

const pr2 = new Promise((resolve, reject) => {
  resolve('test');
});
pr2.then((value) => {
  throw new Error('Fail');
  console.log(value);
}).catch((value) => {
  console.log(`Got error ${value}`);
});
// ==> `Got error Fail`