import { createSlice } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_KEY } from './constants';
import { makeId } from './utilities';

/**
 * Create new todo item
 *
 * @param {number} id
 * @param {string} final
 * @returns {object}
 */
const makeNewTodo = (id, listId, final) => ({
  id,
  text: {
    draft: final,
    final
  },
  listId,
  isEditActive: false,
  isComplete: false,
  isRemoved: false
});

/**
 * Create new todo list
 *
 * @param {number} id
 * @param {string} final
 * @returns {object}
 */
const makeNewList = (id, final) => ({
  id,
  text: {
    draft: final,
    final
  },
  isEditActive: false
});

/**
 * Retrieve data from local storage or initial data structure.
 *
 * @returns {object}
 */
const getInitialState = () => {
  const local = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const initial = {
    list: { items: { 1: { ...makeNewList(1, 'Todo List') } }, sort: [1] },
    todos: { items: {}, sort: { 1: [] } }
  };

  if (local) return JSON.parse(local);
  return initial;
};

const initialState = getInitialState();

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState.todos,
  reducers: {
    add: (state, action) => {
      const id = makeId();
      state.items[id] = makeNewTodo(id, action.payload.listId, 'New todo');
      state.sort[action.payload.listId].push(id);
    },
    edit: (state, action) => {
      state.items[action.payload.id].isEditActive = true;
    },
    save: (state, action) => {
      state.items[action.payload.id].isEditActive = false;
      state.items[action.payload.id].text.final = action.payload.draft;
    },
    cancel: (state, action) => {
      const final = state.items[action.payload.id].text.final;
      state.items[action.payload.id].isEditActive = false;
      state.items[action.payload.id].text.draft = final;
    },
    remove: (state, action) => {
      const listId = state.items[action.payload.id].listId;
      state.sort[listId] = state
        .sort[listId]
        .filter(id => id !== action.payload.id);
      state.items[action.payload.id].isRemoved = true;
    },
    complete: (state, action) => {
      state.items[action.payload.id].isComplete = action.payload.checked;
    },
    change: (state, action) => {
      state.items[action.payload.id].text.draft = action.payload.draft;
    },
    reorder: (state, action) => {
      const list = state.sort[action.payload.listId];
      const orderedId = list[action.payload.oldIndex];
      list.splice(action.payload.oldIndex, 1);
      list.splice(action.payload.newIndex, 0, orderedId);
    },
    addSort: (state, action) => { state.sort[action.payload.listId] = []; }
  }
});

const listSlice = createSlice({
  name: 'list',
  initialState: initialState.list,
  reducers: {
    add: (state, action) => {
      const listId = action.payload.listId;
      state.items[listId] = makeNewList(listId, 'New List');
      state.sort.push(listId);
    },
    edit: (state, action) => {
      state.items[action.payload.id].isEditActive = true;
    },
    save: (state, action) => {
      state.items[action.payload.id].isEditActive = false;
      state.items[action.payload.id].text.final = action.payload.draft;
    },
    cancel: (state, action) => {
      const final = state.items[action.payload.id].text.final;
      state.items[action.payload.id].isEditActive = false;
      state.items[action.payload.id].text.draft = final;
    },
    change: (state, action) => {
      state.items[action.payload.id].text.draft = action.payload.draft;
    },
    reorder: (state, action) => {
      const orderedId = action.payload.listId;
      state.sort.splice(action.payload.oldIndex, 1);
      state.sort.splice(action.payload.newIndex, 0, orderedId);
    },
  }
});

export { todosSlice, listSlice };
