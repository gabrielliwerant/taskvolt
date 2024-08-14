/**
 * src/redux/selectors/todos.js
 *
 * Handles selectors for todos.
 */

import { uniq as _uniq } from 'lodash';

import { getState } from '../config';

const _getTodos = () => getState('todos');

const getTodosItems = () => _getTodos().items;
const getTodosSort = () => _getTodos().sort;
const getTodoSelected = () => _getTodos().selected;

/**
 * From a given list id, return all todo ids that have that list id.
 *
 * @param {string} id List id
 * @returns {array[string]}
 */
const getTodoIdsByListId = id =>
  Object.values(getTodosItems()).filter(item => item.listId === id).map(item => item.id);

/**
 * From a given list id, return all removed todo ids that have that list id.
 *
 * @param {string} id List id
 * @returns {array[string]}
 */
const getRemovedTodoIdsByListId = id =>
  Object.values(getTodosItems())
    .filter(item => item.isRemoved && item.listId === id)
    .map(item => item.id);

/**
 * Return a unique array of list ids that have any removed todo items.
 *
 * @returns {array[string]}
 */
const getUniqueListIdsFromRemovedTodoItems = () =>
  _uniq(Object.values(getTodosItems()).filter(item => item.isRemoved).map(item => item.listId));

/**
 * Retrieve all removed todo items from a given list id.
 *
 * @param {string} id List id
 * @returns {array[object]}
 */
const getRemovedTodoItemsByListId = id =>
  Object.values(getTodosItems()).filter(item => item.isRemoved && item.listId === id);

const getTodoIdFromTodo = todo => todo.id;

export {
  getTodosItems,
  getTodosSort,
  getTodoSelected,
  getTodoIdsByListId,
  getRemovedTodoIdsByListId,
  getUniqueListIdsFromRemovedTodoItems,
  getRemovedTodoItemsByListId,

  getTodoIdFromTodo
};
