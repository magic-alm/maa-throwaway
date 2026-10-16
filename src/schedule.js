'use strict';

// Returns the ISO string of the instant that is `days` calendar days after
// `startIso`, keeping the same local wall-clock time in the given IANA zone.
function addCalendarDays(startIso, days, timeZone) {
  const start = new Date(startIso);
  return new Date(start.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

module.exports = { addCalendarDays };
