/**
 * src/main/projects.js
 *
 * Handles logic specific to the todo projects system.
 */

/**
 * Create new todo project
 *
 * @param {string} id Project id
 * @param {string} final Text to be saved for todo project editing
 * @returns {object}
 */
const makeNewProject = (id, final) => ({
  id,
  text: {
    draft: final,
    final
  },
  trash: {
    timestamp: null,
    isTrashed: false
  },
  isEditActive: false,
  isActive: false
});

export { makeNewProject };
