'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { CachedStore } = require('../src/cache');

const fresh = () => new CachedStore(new Map([['a', 1], ['b', 2]]));

test('a repeated read is served from cache', () => {
  const c = fresh();
  assert.strictEqual(c.get('a'), 1);
  assert.strictEqual(c.get('a'), 1);
  assert.strictEqual(c.reads, 1);
});
test('a miss is cached too', () => {
  const c = fresh();
  assert.strictEqual(c.get('zzz'), undefined);
  assert.strictEqual(c.get('zzz'), undefined);
  assert.strictEqual(c.reads, 1);
});
test('set after a cached read is visible on the next read', () => {
  const c = fresh();
  c.get('a');
  c.set('a', 10);
  assert.strictEqual(c.get('a'), 10);
});
test('delete after a cached read is visible on the next read', () => {
  const c = fresh();
  c.get('a');
  c.delete('a');
  assert.strictEqual(c.get('a'), undefined);
});
test('set after a cached miss is visible', () => {
  const c = fresh();
  c.get('new');
  c.set('new', 5);
  assert.strictEqual(c.get('new'), 5);
});
test('delete then set then read returns the new value, with one store read per cold key', () => {
  const c = fresh();
  c.get('b');
  c.delete('b');
  c.set('b', 20);
  assert.strictEqual(c.get('b'), 20);
  assert.strictEqual(c.reads, 1);
});
test('unrelated keys stay cached across a delete', () => {
  const c = fresh();
  c.get('a'); c.get('b');
  c.delete('a');
  assert.strictEqual(c.get('b'), 2);
  assert.strictEqual(c.reads, 2);
});
