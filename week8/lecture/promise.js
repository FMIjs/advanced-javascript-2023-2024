const fs = require('fs');

function readFile(filePath, options) {
  return new Promise((res, rej) => {
    fs.readFile(filePath, options, (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
}

function writeFile(filePath, data, options) {
  return new Promise((res, rej) => {
    fs.writeFile(filePath, data, options, (err) => {
      if (err) return rej(err);
      res();
    });
  });
}

// [1].map(x => x + 1).map(x => x + 2) //sync
readFile('test.txt', { encoding: 'utf-8' })
  .then(data => writeFile('test.txt', data.slice(0, -1) + ' WORLD!'))
  .then(() => true)
  .catch(err => { console.error(err); return false; })
  .then((success) => console.log(success ? 'File successfully updated!' : 'File not updated!'));

// spread operator
const data = [1, 2, 3, 4];

const b = function (a, b, c, d) {

}
b(...data);

const data2 = [...data, 2, 3, 4];

const obj = { a: 1, b: 2, c: 3 }

const obj2 = { ...obj, d: 4 };

// rest operator
function test(...args) {
  console.log(args);
}

const obj5 = { a: 1, b: 2, c: 3 };

const { a, ...rest } = obj5;

const arr1 = [1, 2, 3];

const [firstElem, ...rest2] = arr1;