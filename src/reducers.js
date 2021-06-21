import { createSlice } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_KEY } from './constants';

/**
 * Create ids for new lists/items
 *
 * @returns {number}
 */
const makeId = () => Math.floor(Math.random() * 1000000);

/**
 * Create new todo item
 *
 * @param {number} id
 * @param {string} final
 * @returns {object}
 */
const makeNewTodo = (id, final) => ({
  id,
  text: {
    draft: final,
    final
  },
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
    list: { items: { '0': { ...makeNewList(0, 'Todo List') } } },
    todos: { items: {}, sort: [] }
  };

  if (local) return JSON.parse(local);
  return initial;
};

const initialState = getInitialState();

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState.todos,
  reducers: {
    add: state => {
      const id = makeId();
      state.items[id] = makeNewTodo(id, 'New todo');
      state.sort.push(id);
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
      state.sort = state.sort.filter(id => id !== action.payload.id);
      state.items[action.payload.id].isRemoved = true;
    },
    complete: (state, action) => {
      state.items[action.payload.id].isComplete = action.payload.checked;
    },
    change: (state, action) => {
      state.items[action.payload.id].text.draft = action.payload.draft;
    },
    reorder: (state, action) => {
      const orderedId = state.sort[action.payload.oldIndex];
      state.sort.splice(action.payload.oldIndex, 1);
      state.sort.splice(action.payload.newIndex, 0, orderedId);
    }
  }
});

const listSlice = createSlice({
  name: 'list',
  initialState: initialState.list,
  reducers: {
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
    }
  }
});

export { todosSlice, listSlice };
