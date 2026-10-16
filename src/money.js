'use strict';

// Rounds a decimal amount given as a string to 2 decimal places and returns a
// string with exactly 2 decimals.
function roundMoney(amount) {
  return (Math.round(Number(amount) * 100) / 100).toFixed(2);
}

module.exports = { roundMoney };
