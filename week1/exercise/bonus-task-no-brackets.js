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
        const l1 = numbers.pop();
        const l2 = numbers.pop();
        numbers.push(l1 * l2);
        operators.pop();
      } else if (operators[operators.length - 1] == "/") {
        const l1 = numbers.pop();
        const l2 = numbers.pop();
        numbers.push(l1 / l2);
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

const input1 = "3 + 2 = 5";
const input2 = "7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9";
console.log(calculateCorrectEquations(input1));
console.log(calculateCorrectEquations(input2));