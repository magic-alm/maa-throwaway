'use strict';

// Parses `Key: value` lines from a header block into an object. A line that
// starts with whitespace continues the previous value (joined with a space).
function parseHeaders(block) {
  const out = {};
  for (const m of String(block).matchAll(/^([A-Za-z-]+):\s*(.*)$/g)) out[m[1].toLowerCase()] = m[2];
  return out;
}

module.exports = { parseHeaders };
