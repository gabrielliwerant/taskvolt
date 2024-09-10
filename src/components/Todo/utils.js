/**
 * src/components/Todo/utils.js
 *
 * Holds reusable utilities for todo-related components.
 */

import { MARGINS, BORDER_OFFSET } from '@jss/constants';

import { getDragDropId } from '@src/utils';
import { TYPES } from '@src/constants';

/**
 * Determine if a set of color start and stop indicate a gradient.
 *
 * It cannot be a gradient if the colors are the same.
 *
 * @param {string} start Color value
 * @param {string} stop Color value
 * @returns {boolean}
 */
const _hasGradient = (start, stop) => start !== stop;

/**
 * Retrieve the appropriate background color based on given colors and whether or not they
 * represent a gradient.
 *
 * @param {string} color0 Color value
 * @param {string} color1 Color value
 * @returns {boolean}
 */
const getBackground = (color0, color1) => _hasGradient(color0, color1)
  ? `linear-gradient(0.5turn, ${color0}, ${color1}, ${color0})`
  : color0;

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
 * @param {array[string]} todosSort
 * @returns {integer}
 */
const getTodosHeight = (listId, todosSort = []) => {
  let height = 0;
  const todosEl = document.querySelector(`[data-rbd-droppable-id="droppable-todos-${listId}"]`);

  if (!todosEl?.children) return 0;

  // Subtracts one for placeholder `div`
  const len = todosEl.children.length - 1;

  for (let i = 0; i < len; i += 1) {
    const id = getDragDropId(todosEl.children[i].getAttribute('data-rbd-draggable-id'));

    // Skip calculations for any todos that are missing from the sort list
    if (todosSort.length && !todosSort.includes(id)) continue;

    height += todosEl.children[i].clientHeight;
    height += MARGINS[TYPES.TODO].MAIN;
  }

  return height;
};

export { getBackground, getTodoHeight, getTodosHeight };
