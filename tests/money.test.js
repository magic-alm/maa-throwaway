'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { roundMoney } = require('../src/money');

// Half-to-even on the exact decimal input (no binary float ties):
// a tie (third decimal 5 with nothing after) rounds to the even cent;
// anything beyond a tie rounds away from zero; negatives are symmetric.
const cases = [
  ['1.234', '1.23'], ['1.236', '1.24'], ['1.2', '1.20'], ['7', '7.00'],
  ['2.345', '2.34'], ['2.355', '2.36'], ['0.005', '0.00'], ['0.015', '0.02'],
  ['2.3451', '2.35'],
  ['-2.345', '-2.34'], ['-2.355', '-2.36'], ['-1.236', '-1.24'],
  ['1.005', '1.00'], ['1.015', '1.02'],
];
for (const [input, expected] of cases) {
  test(`roundMoney(${JSON.stringify(input)}) === ${JSON.stringify(expected)}`, () => {
    assert.strictEqual(roundMoney(input), expected);
  });
}
