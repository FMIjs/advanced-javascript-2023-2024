class MyPromise {

  state = 'pending'; // Possible states are pending, running, resolved, rejected 
                     // State flow is as follows: pending ==> running ==> resolved/rejected ==> pending

  constructor(handlerFn) {
    this.handlerFn = handlerFn;
  }

  then(thenHandlerFn) {
    this.state = 'pending';
    this.thenHandlerFn = thenHandlerFn;
    this.runHandlerFn();
  }
  catch(catchHandlerFn) {
    this.state = 'pending';
    this.catchHandlerFn = catchHandlerFn;
    this.runHandlerFn();
  }

  runHandlerFn() {
    this.state = 'running';
    const resolve = (value) => {
      this.state = 'resolved';
      this.thenHandlerFn(value);
    }
    const reject = (value) => {
      this.state = 'rejected';
      this.catchHandlerFn(value);
    }

    this.handlerFn(resolve, reject);
  }
}

const promiseHandlerFn = (resolve, reject) => {
  resolve('Success');
};

const myPromise = new MyPromise(promiseHandlerFn);

const thenHandler1 = (value) => {
  console.log(value);
}
myPromise.then(thenHandler1);

console.log(myPromise.state);

// const p1 = new Promise((resolve, reject) => {
//   resolve('Success');
// });

// const myFailingPromise = new MyPromise((resolve, reject) => reject('Fail'));
// const catchHandlerFn1 = (value) => {
//   console.log(value);
// }
// myFailingPromise.catch(catchHandlerFn1);

// const p1 = new Promise(() => {});
// const p2 = p1.then();
// const p3 = p2.then();
// const p4 = p3.then();
// const p5 = p4.catch();