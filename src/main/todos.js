/**
 * src/main/todos.js
 *
 * Handles logic specific to the todo system.
 */

/**
 * Create new todo item
 *
 * @param {string} id Todo id
 * @param {string} listId
 * @param {string} final Text to be saved for todo after editing
 * @returns {object}
 */
const makeNewTodo = (id, listId, final) => ({
  id,
  text: {
    draft: final,
    final
  },
  dateTimestamp: null,
  listId,
  isEditActive: false,
  isComplete: false,
  isRemoved: false
});

export { makeNewTodo };
