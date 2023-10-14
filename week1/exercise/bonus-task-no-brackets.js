function isMathOperator(character) {
  return (
    character === "+" ||
    character === "-" ||
    character === "*" ||
    character === "/"
  );
}

function calculateParts(parts) {
  return parts.map((part) => {
    const subParts = part.split(" ");
    const numbers = [],
      operators = [];

    for (let i = 0; i < subParts.length; i++) {
      if (isMathOperator(subParts[i])) {
        operators.push(subParts[i]);
        continue;
      }

      numbers.push(Number(subParts[i]));

      if (operators[operators.length - 1] == "*") {
        const rightNumber = numbers.pop();
        const leftNumber = numbers.pop();
        numbers.push(leftNumber * rightNumber);
        operators.pop();
      } else if (operators[operators.length - 1] == "/") {
        const rightNumber = numbers.pop();
        const leftNumber = numbers.pop();
        numbers.push(leftNumber / rightNumber);
        operators.pop();
      }
    }

    let result = numbers[0];
    operators.forEach((operator, i) => {
      if (operator === "+") {
        result += numbers[i + 1];
      } else if (operator === "-") {
        result -= numbers[i + 1];
      }
    });

    return result;
  });
}

function calculateCorrectEquations(str) {
  const parts = str.split("=").map((part) => part.trim());
  const calculatedParts = calculateParts(parts);
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
    "8 / 2 = 4",
  ];
  const expectedResults = ["1/1", "2/3", "1/1"];

  return tests.every((test, i) => {
    return calculateCorrectEquations(test) === expectedResults[i];
  });
}

console.log(testBonusTask());
