'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { parseHeaders } = require('../src/headers');

const cases = [
  ['Host: example.com', { host: 'example.com' }],
  ['Host: example.com\nAccept: text/html', { host: 'example.com', accept: 'text/html' }],
  ['Host: example.com\r\nAccept: text/html\r\n', { host: 'example.com', accept: 'text/html' }],
  ['Subject: hello\n  world\nTo: a@b', { subject: 'hello world', to: 'a@b' }],
  ['Subject: hello\n\tworld\n\tagain\nTo: a@b', { subject: 'hello world again', to: 'a@b' }],
  ['X-Empty:\nTo: a@b', { 'x-empty': '', to: 'a@b' }],
  ['Note: has: colons: inside', { note: 'has: colons: inside' }],
  ['', {}],
];
for (const [input, expected] of cases) {
  test(`parseHeaders(${JSON.stringify(input)})`, () => {
    assert.deepStrictEqual(parseHeaders(input), expected);
  });
}
