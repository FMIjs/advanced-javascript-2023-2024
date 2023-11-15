const fs = require("fs");

const writeStream = fs.createWriteStream("./test.txt", {
  encoding: "utf8",
  highWaterMark: 10,
});

const data = {
  stream1:
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  stream2:
    "LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA",
};


/*

  Task 1.
  Implement a PushStream class.
    - the idea is that 
  

*/

function PushStream(chunkSize, streamName) {
  this.dataStream = data[streamName] || "";
  this.chunkSize = chunkSize;

  this.isRunning = false;

  this.listeners = {
    data: null,
    end: null,
  };
}

PushStream.prototype.on = function (event, callback) {
  // Attach an event listener to the stream.
  // The only two events we care about are "data" and "end"

  // ...
};

PushStream.prototype.pipe = function (destination) {
  // destination is a Writable stream
  // meaning it has `write` and `end` methods, which we need to use to "pipe" the data
  // destination.write(chunk);
  // destination.end();

  //...
};

PushStream.prototype.startReading = function () {
  if (!this.listeners.data || this.isRunning) {
    return;
  }

  this.isRunning = true;
  let currentSliceStart = 0;
  let currentSliceEnd = this.chunkSize;
  const intervalFunction = function () {
    // this function will be called every second and will read the next chunk
    // when the whole thing is done don't forget to clear the interval and "end"!

    // ...

    this.listeners.data.forEach(function (listener) {
      listener(currentSlice);
    });
    
    // ...

  }.bind(this);
  const interval = setInterval(intervalFunction, 1000);
};

const pushStreamReader = new PushStream(10, "stream1");
pushStreamReader.on("data", function (chunk) {
  console.log(chunk);
});

pushStreamReader.on("end", function () {
  console.log("<done reading>");
});

pushStreamReader.pipe(writeStream);


/*

  ------------------------------------------------------

  Bonus Task.
  Implement a PullStream class.

*/


function PullStream(chunkSize, streamName) {
  this.dataStream = data[streamName] || "";
  this.chunkSize = chunkSize;
  this.done = false;
}

PullStream.prototype.read = function () {
  // reads the next chunk of data from the stream
  // returns data in the following format: `{ done: boolean, data: string }`
  // data contains the next chunk of data
  // done is true when the stream is finished

  // ...
};

const pullStreamReader = new PullStream(20, "stream2");

console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: null, done: true }
console.log(pullStreamReader.read()); // logs: { data: null, done: true }
console.log(pullStreamReader.read()); // logs: { data: null, done: true }
