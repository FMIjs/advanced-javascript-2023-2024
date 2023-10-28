var fs = require('fs');

// var file = fs.readFileSync('intro.js', { encoding: 'utf8' });
// fs.writeFileSync('test.txt', 'HELLO WORLD!');
// console.log(file);

fs.readFile('intro.js', { encoding: 'utf-8' }, function afterReadHandler(err, data) {
  if (err) {
    console.error(err);
    return;
  }

  // dummy way of counting how many times we have the string "process.nextTick"
  // var result = data.split('process.nextTick');
  // var processNextTickCount = result.length - 1;

  // some methods that we can use with regex
  /a/.test();
  /a/.exec();
  ''.split(/a/);
  ''.replace(/a/);
  ''.match(/a/);
  ''.matchAll(/a/); // ES6

  var processNextTickMatches = data.match(/process.nextTick/g) || [];
  fs.writeFile('process-next-tick-count', processNextTickMatches.length, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Completed!');
  });
});

console.log('HELLO!');