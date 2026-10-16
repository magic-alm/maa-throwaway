'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { slugify } = require('../src/slug');

const cases = [
  ['Hello World', 'hello-world'],
  ['  leading and trailing  ', 'leading-and-trailing'],
  ['a -- b   c', 'a-b-c'],
  ['MiXeD CaSe 123', 'mixed-case-123'],
  ['dots.and_underscores', 'dots-and-underscores'],
  ['', ''],
  ['Crème Brûlée', 'creme-brulee'],
  ['Straße & Ærø', 'strasse-aero'],
];

for (const [input, expected] of cases) {
  test(`slugify(${JSON.stringify(input)}) === ${JSON.stringify(expected)}`, () => {
    assert.strictEqual(slugify(input), expected);
  });
}
