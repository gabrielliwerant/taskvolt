/**
 * utilities.js
 *
 * Separate exportable, reusable utilities.
 */

/**
 * Create ids for new lists/items
 *
 * @returns {number}
 */
const makeId = () => Math.floor(Math.random() * 1000000);

export { makeId };
