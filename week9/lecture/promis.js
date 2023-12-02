const PromisState = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class Promis {
  constructor(handlerFn) {
    this.state = PromisState.PENDING;
    this.onFulfilledCallback = null;
    this.onRejectedCallback = null;
    this.value = null;

    const resolve = (data) => {
      if (this.state !== PromisState.PENDING) return;
      if (!this.onFulfilledCallback) return;
      this.value = data;
      this.onFulfilledCallback(data);
    }

    const reject = (error) => {
      if (this.state !== PromisState.PENDING) return;
      if (!this.onRejectedCallback) return;
      this.onRejectedCallback(error);
    }

    try {
      handlerFn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilledCallback, onRejectedCallback) {
    return new Promis((res, rej) => {
      if (this.state === PromisState.PENDING) {
        this.onFulfilledCallback = () => {
          try {
            const result = onFulfilledCallback(this.value);
            if (result instanceof Promis && result.state === PromisState.PENDING) {
              return result.then(res, rej);
            }
            const value = result instanceof Promis ? result.value : result;
            res(value);
          } catch (error) {
            reject(error);
          }
        }
        this.onRejectedCallback = () => {
          try {
            const result = onRejectedCallback(this.value);
            if (result instanceof Promis && result.state === PromisState.PENDING) {
              result.then(res, rej);
            }
            const value = result instanceof Promis ? result.value : result;
            res(value);
          } catch (error) {
            reject(error);
          }
        }
      }
    });
  }
}

let counter = 3;
const data = [{ id: 1, name: 'Name 1' }, { id: 2, name: 'Name 2' }];

function readFromDatabase(condFn, cb) {
  setTimeout(() => {
    cb(null, condFn ? data.filter(condFn) : data)
  }, 5000);
}

function databaseRead(condFn) {
  return new Promis((res, rej) => {
    readFromDatabase(condFn, (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
}

databaseRead().then(function (data) {
  console.log(data)
  return databaseRead((i) => i.id > 1);
}, function (error) {
  console.error(error)
}).then((newData) => {
  console.log(newData);
});