const test = require('node:test');
const assert = require('node:assert');
const { farewell } = require('../src/farewell.js');

test('farewell greets World', () => {
  assert.strictEqual(farewell('World'), 'Goodbye, World!');
});
