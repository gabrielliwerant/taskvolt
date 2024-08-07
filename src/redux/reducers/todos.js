/**
 * src/redux/reducers/todos.js
 *
 * Handles state slice for todos.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from '../../main/getInitialState';
import { makeNewTodo } from '../../main/todos';
import { makeId } from '../../utils';

const todosSlice = createSlice({
  name: 'todos',
  initialState: getInitialState().todos,
  reducers: {
    add: (state, action) => {
      const id = makeId();
      
      state.items[id] = makeNewTodo(id, action.payload, 'New todo');
      state.sort[action.payload].push(id);
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
    addSort: (state, action) => { state.sort[action.payload.id] = []; },
    select: (state, action) => { state.selected = action.payload.id; }
  }
});

export { todosSlice };
