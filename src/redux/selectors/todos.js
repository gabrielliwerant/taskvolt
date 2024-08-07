/**
 * src/redux/selectors/todos.js
 *
 * Handles selectors for todos.
 */

import { getState } from '../config';

const _getTodos = () => getState('todos');

const getTodosItems = () => _getTodos().items;
const getTodosSort = () => _getTodos().sort;
const getTodoSelected = () => _getTodos().selected;

export { getTodosItems, getTodosSort, getTodoSelected };
