'use strict';

function slugify(text) {
  return String(text)
    .replace(/ß/g, 'ss')
    .replace(/[Ææ]/g, 'ae')
    .replace(/[Øø]/g, 'o')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = { slugify };
