import { getState } from './config';

const getTodos = () => getState('todos');
const getItems = () => getTodos().items;
const getSort = () => getTodos().sort;
const getItemsSort = () => getSort().map(id => getItems()[id]);

const getList = () => getState('list');
const getListItems = () => getList().items['0'];

export { getItemsSort, getListItems };
