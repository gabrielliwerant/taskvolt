/**
 * src/main/projects.js
 *
 * Handles logic specific to the todo projects system.
 */

/**
 * Create new todo project
 *
 * @param {string} id Project id
 * @param {string} userId
 * @param {string} final Text to be saved for todo project editing
 * @returns {object}
 */
const makeNewProject = (id, userId, final) => ({
  id,
  text: {
    draft: final,
    final
  },
  userId,
  isEditActive: false,
  isRemoved: false,
  isActive: false
});

export { makeNewProject };
