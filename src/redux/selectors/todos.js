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
const _getTodoSortByListId = id => getTodosSort()[id];
const getTodoIdBySortIndex = (index, listId) => _getTodoSortByListId(listId)[index];
const getTodoSelected = () => _getTodos().selected;
const getTodoDropping = () => _getTodos().dropping;
const getTodoSortIndexById = (id, listId) => _getTodoSortByListId(listId).findIndex(i => i === id);
const _getTodoItemById = id => getTodosItems()[id];
const getTodoItemListIdById = id => _getTodoItemById(id).listId;
const isTodoCompleteById = id => _getTodoItemById(id).isComplete;
const getTodoDraftTextById = id => _getTodoItemById(id).text.draft;
const getTodoFinalTextById = id => _getTodoItemById(id).text.final;
const isTodoEditActiveById = id => _getTodoItemById(id).isEditActive;
const getTodoItemDateTimestampById = id => getTodosItems()[id].date.timestamp;

/**
 * From a given list id, return all todo ids that have that list id.
 *
 * @param {string} id List id
 * @returns {array[string]}
 */
const getTodoIdsByListId = id =>
  Object.values(getTodosItems()).filter(item => item.listId === id).map(item => item.id);

/**
 * From a given list id, return all todo items that have that list id.
 *
 * @param {string} id List id
 * @returns {array[string]}
 */
const getTodoItemsByListId = id =>
  Object.values(getTodosItems()).filter(item => item.listId === id);

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
const getTodoListIdFromTodo = todo => todo.listId;

export {
  getTodosItems,
  getTodosSort,
  getTodoIdBySortIndex,
  getTodoSelected,
  getTodoDropping,
  getTodoSortIndexById,
  getTodoItemListIdById,
  isTodoCompleteById,
  getTodoDraftTextById,
  getTodoFinalTextById,
  isTodoEditActiveById,
  getTodoItemDateTimestampById,
  getTodoIdsByListId,
  getTodoItemsByListId,
  getRemovedTodoIdsByListId,
  getUniqueListIdsFromRemovedTodoItems,
  getRemovedTodoItemsByListId,

  getTodoIdFromTodo,
  getTodoListIdFromTodo
};
