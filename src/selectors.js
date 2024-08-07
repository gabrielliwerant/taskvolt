import { getState } from './redux/config';

const getTodos = () => getState('todos');
const getTodosItems = () => getTodos().items;
const getTodosSort = () => getTodos().sort;
const getTodoSelected = () => getTodos().selected;

const getLists = () => getState('lists');
const getListsItems = () => getLists().items;
const getListsSort = () => getLists().sort;
const getListSelected = () => getLists().selected;
const getListDropping = () => getLists().dropping;

const getProjects = () => getState('projects');
const getProjectsItems = () => getProjects().items;
const getProjectsSort = () => getProjects().sort;

export {
  getTodosItems,
  getTodosSort,
  getTodoSelected,

  getListsItems,
  getListsSort,
  getListSelected,
  getListDropping,

  getProjectsItems,
  getProjectsSort
};
