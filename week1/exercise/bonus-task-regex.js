// v2 with regex and brackets
var prioRegex = /[-]*[[0-9]+ [*/] [-]*[[0-9]+/g;
var nonPriRegex = /[-]*[[0-9]+ [+-] [-]*[[0-9]+/g;
var bracketsRegex = /\([^()]+\)/g;

function calculateExpression(expression) {
  const parts = expression.split(" ");
  const n1 = Number(parts[0]);
  const n2 = Number(parts[2]);
  const operator = parts[1];

  switch (operator) {
    case "*": return n1 * n2;
    case "/": return n1 / n2;
    case "+": return n1 + n2;
    case "-": return n1 - n2;
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

const input1 = "3 + 2 = 5";
const input2 = "7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9";
const input3 = "((1 + 5) * 4) * 2 / 6 + 2 - 3 = 7 = 1";
console.log(calculateCorrectEquations(input1));
console.log(calculateCorrectEquations(input2));
console.log(calculateCorrectEquations(input3));
