'use strict';

const TRANSLITERATIONS = {
  '\u00df': 'ss',  // ß
  '\u00c6': 'ae',  // Æ
  '\u00e6': 'ae',  // æ
  '\u00d8': 'o',   // Ø
  '\u00f8': 'o',   // ø
};

function slugify(text) {
  return String(text)
    .replace(/[^\u0000-\u007F]/g, (ch) => {
      if (TRANSLITERATIONS[ch]) return TRANSLITERATIONS[ch];
      const normalized = ch.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
      return normalized || '';
    })
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = { slugify };
