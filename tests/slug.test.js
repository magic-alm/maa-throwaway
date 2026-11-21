'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { slugify, slugifyAll } = require('../src/slug');

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

test("slugifyAll(['Ærø','Hello World']) equals element-wise slugify results", () => {
  const input = ['Ærø', 'Hello World'];
  assert.deepStrictEqual(slugifyAll(input), input.map(slugify));
});

test("slugifyAll('x') throws TypeError", () => {
  assert.throws(() => slugifyAll('x'), { name: 'TypeError' });
});
