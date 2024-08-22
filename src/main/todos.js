/**
 * src/main/todos.js
 *
 * Handles logic specific to the todo system.
 */

import { COLOR_OPTIONS } from '@src/theme';

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
  date: {
    timestamp: null,
    hasReminder: false
  },
  time: {
    timestamp: null,
    hasReminder: false
  },
  trash: {
    timestamp: null,
    isTrashed: false
  },
  listId,
  color: COLOR_OPTIONS.PRIMARY,
  isEditActive: false,
  isComplete: false
});

export { makeNewTodo };
