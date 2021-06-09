import { getState } from './config';

const getTodos = () => getState('todos');
const getItems = () => getTodos().items;
const getSort = () => getTodos().sort;
const getItemsSort = () => getSort().map(id => getItems()[id]);

export { getItemsSort };
