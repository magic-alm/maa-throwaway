'use strict';

// Planted defect for the controlled analyst experiment: diacritics are not
// folded and ligatures are not expanded, so `slugify('Crème Brûlée')` and
// `slugify('Straße & Ærø')` both fail tests/slug.test.js. The intended fix is
// a few lines in this file only.
function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = { slugify };
