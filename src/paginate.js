'use strict';

// Returns { items, page, totalPages, hasPrev, hasNext } for a 1-based page.
function paginate(items, page, pageSize) {
  const totalPages = Math.ceil(items.length / pageSize);
  const start = page * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page,
    totalPages,
    hasPrev: page > 1,
    hasNext: page < totalPages,
  };
}

module.exports = { paginate };
