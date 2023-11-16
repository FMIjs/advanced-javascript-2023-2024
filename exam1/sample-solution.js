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

  Task 1. Implement a PushStream class.

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
  if (this.listeners[event] === undefined) {
    return;
  }

  this.listeners[event] = this.listeners[event] || [];
  this.listeners[event].push(callback);

  if (!this.isRunning) {
    this.startReading();
  }
};

PushStream.prototype.pipe = function (destination) {
  // destination is a Writable stream
  // meaning it has `write` and `end` methods, which we need to use here:
  // destination.write(chunk);
  // destination.end();

  if (!destination.write) {
    return;
  }

  this.on("data", function (chunk) {
    destination.write(chunk);
  });

  this.on("end", function () {
    destination.end();
  });
};

PushStream.prototype.startReading = function () {
  if (!this.listeners.data || this.isRunning) {
    return;
  }

  this.isRunning = true;
  let start = 0;
  let end = this.chunkSize;
  const intervalFunction = function () {
    // this function will be called every second and will read the next chunk
    // when the whole thing is done don't forget to clear the interval!

    if (end > this.dataStream.length) {
      clearInterval(interval);
      if (this.listeners.end) {
        this.listeners.end.forEach(function (listener) {
          listener();
        });
      }
      return;
    }

    const currentSlice = this.dataStream.slice(start, end);

    this.listeners.data.forEach(function (listener) {
      listener(currentSlice);
    });

    start = end;
    end += this.chunkSize;
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
  
  Task 2. Implement a PullStream class.

*/


function PullStream(chunkSize, streamName) {
  this.dataStream = data[streamName] || "";
  this.chunkSize = chunkSize;
  this.done = false;
}

PullStream.prototype.read = function () {
  // returns data in the following format:
  // { done: boolean, data: string }

  if (this.done) {
    return { done: true, data: null };
  }

  const result = this.dataStream.slice(0, this.chunkSize);
  this.dataStream = this.dataStream.slice(this.chunkSize);
  if (this.dataStream.length === 0) {
    this.done = true;
  }
  return { done: false, data: result };
};

const pullStreamReader = new PullStream(20, "stream2");

console.log(pullStreamReader.read());
console.log(pullStreamReader.read());
console.log(pullStreamReader.read());
console.log(pullStreamReader.read());
console.log(pullStreamReader.read());
console.log(pullStreamReader.read());
console.log(pullStreamReader.read());
console.log(pullStreamReader.read());
