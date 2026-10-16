'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { paginate } = require('../src/paginate');

const ten = Array.from({ length: 10 }, (_, i) => i + 1);
const cases = [
  [[ten, 1, 3], { items: [1, 2, 3], page: 1, totalPages: 4, hasPrev: false, hasNext: true }],
  [[ten, 2, 3], { items: [4, 5, 6], page: 2, totalPages: 4, hasPrev: true, hasNext: true }],
  [[ten, 4, 3], { items: [10], page: 4, totalPages: 4, hasPrev: true, hasNext: false }],
  // Exact multiple: no phantom empty trailing page.
  [[ten, 2, 5], { items: [6, 7, 8, 9, 10], page: 2, totalPages: 2, hasPrev: true, hasNext: false }],
  // Empty input still has one (empty) page, never zero pages.
  [[[], 1, 5], { items: [], page: 1, totalPages: 1, hasPrev: false, hasNext: false }],
  // A page past the end is empty, has a previous page, and no next.
  [[ten, 5, 3], { items: [], page: 5, totalPages: 4, hasPrev: true, hasNext: false }],
];
for (const [args, expected] of cases) {
  test(`paginate(${JSON.stringify(args)})`, () => {
    assert.deepStrictEqual(paginate(...args), expected);
  });
}
