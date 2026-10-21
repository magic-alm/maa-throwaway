const test = require('node:test');
const assert = require('node:assert');
const { greet } = require('./hello-world');

test('greet returns a hello message for a name', () => {
  assert.strictEqual(greet('World'), 'Hello, World!');
});
