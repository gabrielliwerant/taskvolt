import { getState } from './config';

const getTodos = () => getState('todos');
const getTodosItems = () => getTodos().items;
const getTodosItemsSort = () => getTodos().sort;

const getLists = () => getState('list');
const getListsItems = () => getLists().items;
const getListsSort = () => getLists().sort;

export { getTodosItems, getTodosItemsSort, getListsItems, getListsSort };
