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
    expunge: (state, action) => { delete state.items[action.payload]; },
    restore: (state, action) => {
      const listId = state.items[action.payload].listId;

      state.sort[listId].push(action.payload);
      state.items[action.payload].isRemoved = false;
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

      const sort = state.sort[listId];
      const todoId = sort[oldIndex];
      sort.splice(oldIndex, 1);
      sort.splice(newIndex, 0, todoId);
    },
    reorderToList: (state, action) => {
      const { oldListId, newListId, oldIndex, newIndex } = action.payload;

      // Get todo id
      const todoId = state.sort[oldListId][oldIndex];

      // Remove todo from current position in old sort array
      state.sort[oldListId].splice(oldIndex, 1);

      // Add todo to next position in new sort array
      state.sort[newListId].splice(newIndex, 0, todoId);

      // Update todo list id owner
      state.items[todoId].listId = newListId;
    },
    select: (state, action) => { state.selected = action.payload; }
  }
});

export { todosSlice };
