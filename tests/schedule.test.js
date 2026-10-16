'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { addCalendarDays } = require('../src/schedule');

// Calendar semantics: "N days later" keeps the same local wall-clock time in
// the zone, even across a DST transition. America/New_York springs forward
// on 2026-03-08 (02:00 -> 03:00) and falls back on 2026-11-01.
const cases = [
  ['2026-01-10T15:30:00.000Z', 1, 'America/New_York', '2026-01-11T15:30:00.000Z'],
  ['2026-01-10T15:30:00.000Z', 30, 'America/New_York', '2026-02-09T15:30:00.000Z'],
  ['2026-06-10T13:30:00.000Z', 7, 'America/New_York', '2026-06-17T13:30:00.000Z'],
  // 09:30 local on 2026-03-07 (EST, -05:00) -> 09:30 local on 2026-03-08 (EDT, -04:00)
  ['2026-03-07T14:30:00.000Z', 1, 'America/New_York', '2026-03-08T13:30:00.000Z'],
  // 09:30 local on 2026-10-31 (EDT) -> 09:30 local on 2026-11-01 (EST)
  ['2026-10-31T13:30:00.000Z', 1, 'America/New_York', '2026-11-01T14:30:00.000Z'],
  // Zero and negative day counts.
  ['2026-03-07T14:30:00.000Z', 0, 'America/New_York', '2026-03-07T14:30:00.000Z'],
  ['2026-03-09T13:30:00.000Z', -2, 'America/New_York', '2026-03-07T14:30:00.000Z'],
  ['2026-03-07T14:30:00.000Z', 1, 'UTC', '2026-03-08T14:30:00.000Z'],
];

for (const [start, days, zone, expected] of cases) {
  test(`addCalendarDays(${start}, ${days}, ${zone}) === ${expected}`, () => {
    assert.strictEqual(addCalendarDays(start, days, zone), expected);
  });
}
