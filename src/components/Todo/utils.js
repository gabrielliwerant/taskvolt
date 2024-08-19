/**
 * src/components/Todo/utils.js
 *
 * Holds reusable utilities for todo-related components.
 */

import { MARGINS, LINES_TO_HEIGHT } from '@jss/constants';

import { TYPES, MAX_LENGTH_PER_LINE } from '@src/constants';
import { getTodoFinalTextById, isTodoEditActiveById } from '@redux/selectors/todos';

/**
 * Retrieve the appropriate pixel height for a given string length.
 *
 * @param {integer} len String length
 * @returns {integer}
 */
const _getHeightForTextLength = len => {
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].TWO) return LINES_TO_HEIGHT[TYPES.TODO].TWO;
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].THREE) return LINES_TO_HEIGHT[TYPES.TODO].THREE;
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].FOUR) return LINES_TO_HEIGHT[TYPES.TODO].FOUR;
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].FIVE) return LINES_TO_HEIGHT[TYPES.TODO].FIVE;
};

/**
 * Calculate the total height for a todo id.
 *
 * @param {string} id
 * @returns {integer}
 */
const getTodoHeight = id => {
  let height = 0;

  if (isTodoEditActiveById(id)) height += LINES_TO_HEIGHT[TYPES.TODO].TWO;
  else height += _getHeightForTextLength(getTodoFinalTextById(id).length);

  height += MARGINS[TYPES.TODO].MAIN;

  return height;
};

/**
 * Calculate the total height for a list of todo ids.
 *
 * @param {array[string]} ids
 * @returns {integer}
 */
const getTodosHeight = ids => {
  let height = 0;

  ids.forEach(id => height += getTodoHeight(id));

  return height;
};

export { getTodoHeight, getTodosHeight };
