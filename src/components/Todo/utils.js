/**
 * src/components/Todo/utils.js
 *
 * Holds reusable utilities for todo-related components.
 */

import { MARGINS, BORDER_OFFSET } from '@jss/constants';

import { TYPES } from '@src/constants';

/**
 * Calculate the total height for a list of todos.
 *
 * @param {integer} index
 * @param {string} listId
 * @returns {integer}
 */
const getTodoHeight = (index, listId) => {
  const todosEl = document.querySelector(`[data-rbd-droppable-id="droppable-todos-${listId}"]`);
  const todoEl = todosEl.children[index];

  return todoEl.clientHeight - BORDER_OFFSET;
};

/**
 * Calculate the total height for a list of todos.
 *
 * @param {string} listId
 * @returns {integer}
 */
const getTodosHeight = listId => {
  let height = 0;
  const todosEl = document.querySelector(`[data-rbd-droppable-id="droppable-todos-${listId}"]`);

  if (!todosEl?.children) return 0;

  // Subtracts one for placeholder `div`
  const len = todosEl.children.length - 1;

  for (let i = 0; i < len; i += 1) {
    height += todosEl.children[i].clientHeight;
    height += MARGINS[TYPES.TODO].MAIN;
  }

  return height;
};

export { getTodoHeight, getTodosHeight };
