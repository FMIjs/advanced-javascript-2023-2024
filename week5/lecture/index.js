// const fs = require('fs');
// const readStream = fs.createReadStream('./test.txt', { highWaterMark: 1 });

// readStream.on('data', function readData(chunk) {
//   console.log(chunk);
// });

// readStream.on('end', function onEnd() {
//   console.log('Read stream ended');
// });


// Readable stream example
// const { Readable } = require('stream');
// const data = ['This', 'is', 'some', 'data', 'located', 'somewhere'];

// const readableStream = new Readable({
//   read(size) {
//     if (data.length === 0) return this.push(null);
//     this.push(data.shift());
//   }
// });

// readableStream.on('data', function (chunk) {
//   console.log(chunk.toString());
// });

// readableStream.on('end', function () {
//   console.log('Read stream ended');
// });



const { Writable } = require('stream');
const data = [];
const writableStream = new Writable({
  write(chunk, encoding, cb) {
    data.push(chunk.toString());
    setTimeout(function () {
      console.log('Give me next chunk');
      cb();
    }, 1000);
  }
})

writableStream.on('finish', function () {
  console.log(data);
  console.log('Writable stream finished');
});

writableStream.write('31');
writableStream.write('32');
writableStream.write('33');
writableStream.write('34');
writableStream.write('35');
writableStream.end();
