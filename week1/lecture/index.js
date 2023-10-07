// var myString = 'Hello World'; // string literal

// myString += '! How are you?';

// console.log(myString);

// var myNumber = 4; // number literal

// myString = myNumber;
// myNumber = '4';

// console.log(myString, myNumber);


// var myBoolean = true; //false

// var myNull = null;
// var myUndefined = undefined;

// var myFirstFalsyValue = false;
// var mySecondFalsyValue = 0;
// var myThirdFalsyValue = null;
// var myFourthFalsyValue = '';
// var myFifthFalsyValue = undefined;
// var mySixthFalsyValue = NaN;


// var myStr = String('sdsada'); // string factory fn
// var myNum = Number(4); // number factory fn


var myNumber = Number('43213'); // +'321321'
var myString = String(321312); // '' + 321312
var myBool = Boolean('dsada'); // !!'dsada'
console.log(myNumber, myString, myBool);

var myArr = Array();
var arr = [1, 2, 3, true, 'dsa']; // array literal
// myArr.push(1);
// myArr.push(2);
var myObj = Object();
var obj = {
  prop1: 1,
  prop2: '2',
  prop3: [],
  prop4: {
    prop5: {
      prop6: {

      }
    }
  }
}; // object literal

obj.prop10 = 1000;


function sum(a, b) {
  return a + b;
} // function declaration (the type is callable object)

var sum = function (a, b) {
  return a + b;
} // Function expressions


var result = sum(1, 2);


typeof 'sss' //  > 'string';

1 == '1';
1 === '1';


var aaa;