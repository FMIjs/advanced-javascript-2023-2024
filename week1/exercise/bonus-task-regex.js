// v2 with regex and brackets
var prioRegex = /[-]*[[0-9]+ [*/] [-]*[[0-9]+/g;
var nonPriRegex = /[-]*[[0-9]+ [+-] [-]*[[0-9]+/g;
var bracketsRegex = /\([^()]+\)/g;

function calculateExpression(expression) {
  const parts = expression.split(" ");
  const leftNumber = Number(parts[0]);
  const rightNumber = Number(parts[2]);
  const operator = parts[1];

  switch (operator) {
    case "*": return leftNumber * rightNumber;
    case "/": return leftNumber / rightNumber;
    case "+": return leftNumber + rightNumber;
    case "-": return leftNumber - rightNumber;
    default: return 0;
  }
}

function replaceMatches(input, regex) {
  let match;
  while ((match = input.match(regex))) {
    const result = calculateExpression(match[0]);
    input = input.replace(match[0], result.toString());
  }

  return input;
}

function replaceBrackets(input) {
  let match;
  while ((match = input.match(bracketsRegex))) {
    const result = calculateWithRegex(
      match[0].substring(1, match[0].length - 1)
    );
    input = input.replace(match[0], result.toString());
  }

  return input;
}

function calculateWithRegex(input) {
  input = replaceBrackets(input)
  input = replaceMatches(input, prioRegex)
  input = replaceMatches(input, nonPriRegex);
  return input;
}

function calculateCorrectEquations(str) {
  const parts = str.split("=").map((part) => part.trim());
  const calculatedParts = parts.map((part) => calculateWithRegex(part));
  let counter = 0;

  for (let i = 1; i < parts.length; i++) {
    if (calculatedParts[i - 1] === calculatedParts[i]) {
      counter++;
    }
  }

  return `${counter}/${parts.length - 1}`;
}

function testBonusTask() {
  const tests = [
    "3 + 2 = 5",
    "7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9",
    "((1 + 5) * 4) * 2 / 6 + 2 - 3 = 7 = 1",
    "8 / 2 = 4",
  ];

  const expectedResults = [
    "1/1",
    "2/3",
    "1/2",
    "1/1",
  ];

  return tests.every((test, i) => {
    return calculateCorrectEquations(test) === expectedResults[i];
  });
}

console.log(testBonusTask());