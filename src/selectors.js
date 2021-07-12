import { getState } from './config';

const getTodos = () => getState('todos');
const getTodosItems = () => getTodos().items;
const getTodosItemsSort = () => getTodos().sort;
const getTodoSelected = () => getTodos().selected;

const getLists = () => getState('list');
const getListsItems = () => getLists().items;
const getListsSort = () => getLists().sort;

export {
  getTodosItems,
  getTodosItemsSort,
  getTodoSelected,
  getListsItems,
  getListsSort
};
