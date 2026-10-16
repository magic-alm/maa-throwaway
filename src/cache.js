'use strict';

// A read-through cache over a key/value store.
class CachedStore {
  constructor(store) {
    this.store = store;
    this.cache = new Map();
    this.reads = 0;
  }
  get(key) {
    if (this.cache.has(key)) return this.cache.get(key);
    this.reads += 1;
    const value = this.store.get(key);
    this.cache.set(key, value);
    return value;
  }
  set(key, value) {
    this.store.set(key, value);
  }
  delete(key) {
    this.store.delete(key);
  }
}

module.exports = { CachedStore };
