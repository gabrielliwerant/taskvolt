/**
 * utilities.js
 *
 * Separate exportable, reusable utilities.
 */

/**
 * Create ids for new lists/items
 *
 * @returns {string}
 */
const makeId = () => `${Math.floor(Math.random() * 1000000)}`;

/**
 * Get numerical id from draggable id string
 *
 * @param {string} id
 * @returns {string}
 */
const getDraggableId = id => id.split('-').pop();

/**
 * Get the index of a sorted list from an id.
 *
 * @param {string} id
 * @param {object} sort
 * @returns {string}
 */
const getIndexFromId = (id, sort) =>
  Object.values(sort).findIndex(el => el === id);

export { makeId, getDraggableId, getIndexFromId };
