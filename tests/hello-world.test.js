const test = require('node:test');
const assert = require('node:assert/strict');
const { greet } = require('../hello-world.js');

test('greet returns a greeting with the given name', () => {
  assert.equal(greet('World'), 'Hello, World!');
});
