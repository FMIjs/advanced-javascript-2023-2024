var a, b, c; // Hoisting "moving var and function keywords on top of the current scope"
// In reality there is no "moving", this is just parsing the code and finding the var and function keywords

// test(a + 10, 200);

console.log(
  Number.isNaN(NaN), // > true
  Number.isNaN('dsads'), // false
  isNaN(NaN), // > true
  isNaN('dsad'), // > true
);

function test(a, b) { // every function creates new scope
  var c, neshto;
  console.log('hello from test');
  c = 1000;
  console.log(a, b, c);
  console.log(neshto); // > undefined
  {
    {
      {
        neshto = 'neshto';
      }
    }
  }
  console.log(neshto); // > "neshto"
}

a = 10;

if (true) {
  b = 30;

  console.log(a);
}

c = 300;