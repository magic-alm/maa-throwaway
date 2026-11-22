'use strict';

const LIGATURE_MAP = {
  'æ': 'ae',
  'ø': 'o',
  'ß': 'ss',
  'œ': 'oe',
  'þ': 'th',
  'ð': 'd',
};

const LIGATURE_RE = new RegExp(Object.keys(LIGATURE_MAP).join('|'), 'g');

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(LIGATURE_RE, (ch) => LIGATURE_MAP[ch])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugifyAll(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('slugifyAll expects an array');
  }
  return values.map(slugify);
}

module.exports = { slugify, slugifyAll };
