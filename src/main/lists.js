/**
 * src/main/lists.js
 *
 * Handles logic specific to the todo list system.
 */

/**
 * Create new todo list
 *
 * @param {string} id List id
 * @param {string} projectId
 * @param {string} final Text to be saved for todo list after editing
 * @returns {object}
 */
const makeNewList = (id, projectId, final) => ({
  id,
  text: {
    draft: final,
    final
  },
  trash: {
    timestamp: null,
    isTrashed: false
  },
  projectId,
  isEditActive: false
});

export { makeNewList };
