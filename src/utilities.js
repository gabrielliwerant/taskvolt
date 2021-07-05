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

/**
 * Get numerical id from draggable id string
 *
 * @param {string} id
 * @returns {string}
 */
const getDraggableId = id => id.split('-').pop();

export { makeId, getDraggableId };
