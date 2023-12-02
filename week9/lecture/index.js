let counter = 3;
const data = [{ id: 1, name: 'Name 1' }, { id: 2, name: 'Name 2' }];

function readFromDatabase(condFn, cb) {
  setTimeout(() => {
    cb(null, condFn ? data.filter(condFn) : data)
  }, 5000);
}

function writeToDatabase(newItem, cb) {
  const newDataItem = { ...newItem, id: counter++ };
  data.push(newDataItem);
  setTimeout(() => {
    // cb(new Error('Bad error!'));
    cb(null, newDataItem);
  }, 5000);
}

// writeToDatabase({ name: 'Name 3' }, (err, data) => {
//   console.log('new item', data);
//   readFromDatabase(undefined, (err, allItems) => {
//     console.log('all items', allItems);
//   });
// });

function databaseRead(condFn) {
  return new Promise((res, rej) => {
    readFromDatabase(condFn, (err, data) => {
      if (err) return rej(err);
      res(data);
      res([...data]);
    });
  });
}

function databaseWrite(data) {
  return new Promise((res, rej) => {
    writeToDatabase(data, (err, data) => {
      if (err) return rej(err);
      res(data);
      res('HELLO');
    });
  });
}

databaseWrite({ name: 'Name 3' })
  .then(newItem => {
    console.log(newItem);
    return databaseRead()
  }, err => {
    if (err.message === 'Bad error!') {
      return Promise.reject(err);
    }
    console.error(err);
    return databaseRead()
  }).then((allItems) => {
    console.log(allItems);
  }, err => {
    console.error(err);
  }).catch();