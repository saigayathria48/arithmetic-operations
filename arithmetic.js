'use strict';

const OPERATORS = Object.freeze({
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
});

function calculate(operation, first, second) {
  if (!Object.hasOwn(OPERATORS, operation)) {
    throw new Error('Operation must be add, subtract, multiply, or divide');
  }

  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error('Both values must be valid numbers');
  }

  switch (operation) {
    case 'add':
      return first + second;
    case 'subtract':
      return first - second;
    case 'multiply':
      return first * second;
    case 'divide':
      if (second === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return first / second;
  }
}

if (require.main === module) {
  const [operation, firstText, secondText] = process.argv.slice(2);
  const first = Number(firstText);
  const second = Number(secondText);

  if (operation === undefined || firstText === undefined || secondText === undefined) {
    console.error('Usage: node arithmetic.js <add|subtract|multiply|divide> <number1> <number2>');
    process.exitCode = 1;
  } else {
    try {
      console.log(`${first} ${OPERATORS[operation] || '?'} ${second} = ${calculate(operation, first, second)}`);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}

module.exports = { calculate };
