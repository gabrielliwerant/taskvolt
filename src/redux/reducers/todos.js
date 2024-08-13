/**
 * src/redux/reducers/todos.js
 *
 * Handles state slice for todos.
 */

import { createSlice } from '@reduxjs/toolkit';

import { makeId } from '@src/utils';
import { getInitialState } from '@main/getInitialState';
import { makeNewTodo } from '@main/todos';

const todosSlice = createSlice({
  name: 'todos',
  initialState: getInitialState().todos,
  reducers: {
    add: (state, action) => {
      const id = makeId();

      state.items[id] = makeNewTodo(id, action.payload, 'New todo');
      state.sort[action.payload].push(id);
    },
    addSort: (state, action) => { state.sort[action.payload] = []; },
    edit: (state, action) => {
      state.items[action.payload].isEditActive = true;
    },
    save: (state, action) => {
      const { id, draft } = action.payload;

      state.items[id].isEditActive = false;
      state.items[id].text.final = draft;
    },
    cancel: (state, action) => {
      const final = state.items[action.payload].text.final;
      state.items[action.payload].isEditActive = false;
      state.items[action.payload].text.draft = final;
    },
    remove: (state, action) => {
      const listId = state.items[action.payload].listId;

      state.sort[listId] = state.sort[listId].filter(id => id !== action.payload);
      state.items[action.payload].isRemoved = true;
    },
    complete: (state, action) => {
      const { id, checked } = action.payload;
      state.items[id].isComplete = checked;
    },
    change: (state, action) => {
      const { id, draft } = action.payload;
      state.items[id].text.draft = draft;
    },
    reorder: (state, action) => {
      const { listId, oldIndex, newIndex } = action.payload;

      const list = state.sort[listId];
      const orderedId = list[oldIndex];
      list.splice(oldIndex, 1);
      list.splice(newIndex, 0, orderedId);
    },
    select: (state, action) => { state.selected = action.payload; }
  }
});

export { todosSlice };
