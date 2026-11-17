'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../arithmetic');

test('addition returns the sum', () => {
  assert.equal(calculate('add', 10, 5), 15);
});

test('subtraction returns the difference', () => {
  assert.equal(calculate('subtract', 10, 5), 5);
});

test('multiplication returns the product', () => {
  assert.equal(calculate('multiply', 6, 7), 42);
});

test('division returns the quotient', () => {
  assert.equal(calculate('divide', 20, 4), 5);
});

test('division by zero is rejected', () => {
  assert.throws(() => calculate('divide', 10, 0), /Division by zero/);
});
