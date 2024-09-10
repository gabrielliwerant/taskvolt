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
const getTodosDragSort = () => _getTodos().dragSort;
const getTodoSortByListId = id => getTodosSort()[id];
const _getTodoDragSortByListId = id => getTodosDragSort()[id];
const getTodoDragSortIndexById = (id, listId) =>
  _getTodoDragSortByListId(listId).findIndex(i => i === id);
const getTodoSelected = () => _getTodos().selected;
const _getTodoItemById = id => getTodosItems()[id];
const isTodoCompleteById = id => _getTodoItemById(id).isComplete;
const getTodoDraftTextById = id => _getTodoItemById(id).text.draft;
const getTodoFinalTextById = id => _getTodoItemById(id).text.final;
const isTodoEditActiveById = id => _getTodoItemById(id).isEditActive;
const getTodoItemDateTimestampById = id => _getTodoItemById(id).date.timestamp;
const hasTodoItemDateTimestamp = id => !!_getTodoItemById(id).date.timestamp;
const hasTodoDateReminder = id => _getTodoItemById(id).date.hasReminder;
const getTodoItemTimeTimestampById = id => _getTodoItemById(id).time.timestamp;
const hasTodoItemTimeTimestamp = id => _getTodoItemById(id).time.timestamp;
const hasTodoTimeReminder = id => _getTodoItemById(id).time.hasReminder;
const getTodoItemColor = id => _getTodoItemById(id).color;

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
    .filter(item => item.trash.isTrashed && item.listId === id)
    .map(item => item.id);

/**
 * Return a unique array of list ids that have any removed todo items.
 *
 * @returns {array[string]}
 */
const getUniqueListIdsFromRemovedTodoItems = () => _uniq(
  Object.values(getTodosItems())
    .filter(item => item.trash.isTrashed)
    .map(item => item.listId)
    .sort()
);

/**
 * Retrieve all removed todo items from a given list id.
 *
 * @param {string} id List id
 * @returns {array[object]}
 */
const getRemovedTodoItemsByListId = id =>
  Object.values(getTodosItems()).filter(item => item.trash.isTrashed && item.listId === id);

const getTodoIdFromTodo = todo => todo.id;
const getTodoListIdFromTodo = todo => todo.listId;

export {
  getTodosItems,
  getTodosSort,
  getTodosDragSort,
  getTodoSortByListId,
  getTodoDragSortIndexById,
  getTodoSelected,
  isTodoCompleteById,
  getTodoDraftTextById,
  getTodoFinalTextById,
  isTodoEditActiveById,
  getTodoItemDateTimestampById,
  hasTodoItemDateTimestamp,
  hasTodoDateReminder,
  getTodoItemTimeTimestampById,
  hasTodoItemTimeTimestamp,
  hasTodoTimeReminder,
  getTodoItemColor,

  getTodoIdsByListId,
  getTodoItemsByListId,
  getRemovedTodoIdsByListId,
  getUniqueListIdsFromRemovedTodoItems,
  getRemovedTodoItemsByListId,

  getTodoIdFromTodo,
  getTodoListIdFromTodo
};
