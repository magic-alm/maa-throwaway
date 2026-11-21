'use strict';

const LIGATURE_MAP = {
  'æ': 'ae',
  'ø': 'o',
  'ß': 'ss',
  'œ': 'oe',
  'þ': 'th',
  'ð': 'd',
};

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[æøßœþð]/g, (ch) => LIGATURE_MAP[ch] || ch)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugifyAll(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('slugifyAll: values must be an array');
  }
  return values.map(slugify);
}

module.exports = { slugify, slugifyAll };
