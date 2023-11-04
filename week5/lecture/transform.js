const fs = require('fs');
const { Transform } = require('stream');

const readStream = fs.createReadStream('./source.txt', { encoding: 'utf8', highWaterMark: 5 });
const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf8' });

const replacementMap = {
  someValue: 'HELLO WORLD!',
  OOO: '123'
}

function transformText(replacementMap, targetString) {
  for (const key in replacementMap) {
    const regex = new RegExp(key, 'g');
    const replacement = replacementMap[key];
    targetString = targetString.replace(regex, replacement)
  }
  return targetString;
}

const transformStream = new Transform({
  encoding: 'utf8',
  transform(chunk, encoding, cb) {
    const chunkString = chunk.toString();
    if (chunkString.includes('\n')) {
      const lines = (this.buffer + chunkString).split('\n');
      this.buffer = lines.slice(-1)[0];
      const rest = lines.slice(0, -1).concat(['']);
      let transformed = [];
      for (let i = 0; i < rest.length; i++) {
        const currentLine = rest[i];
        transformed = transformed.concat(transformText(replacementMap, currentLine));
      }
      const transformedText = transformed.join('\n');
      // this.push(transformedText);
      // cb();
      return cb(null, transformedText);
    }
    this.buffer = (this.buffer || '') + chunkString;
    cb();
  }
})
transformStream.buffer = '';

readStream.pipe(transformStream).pipe(writeStream);
