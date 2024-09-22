/**
 * src/redux/reducers/todos.js
 *
 * Handles state slice for todos.
 */

import { createSlice } from '@reduxjs/toolkit';

import { makeId, getUnixTimestampFromDate } from '@src/utils';
import { TYPES } from '@src/constants';
import { getInitialState } from '@main/getInitialState';
import { makeNewTodo } from '@main/todos';
import { INITIAL_NAME_TEXT } from '@main/constants';

const todosSlice = createSlice({
  name: 'todos',
  initialState: getInitialState().todos,
  reducers: {
    add: (state, action) => {
      const id = makeId();

      state.items[id] = makeNewTodo(id, action.payload, INITIAL_NAME_TEXT[TYPES.TODO]);
      state.sort[action.payload].unshift(id);
      state.dragSort[action.payload].unshift(id);
    },
    addSort: (state, action) => {
      state.sort[action.payload] = [];
      state.dragSort[action.payload] = [];
    },
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
    setDateTimestamp: (state, action) => {
      const { id, timestamp } = action.payload;
      state.items[id].date.timestamp = timestamp;
    },
    setTimeTimestamp: (state, action) => {
      const { id, timestamp } = action.payload;
      state.items[id].time.timestamp = timestamp;
    },
    setDateReminder: (state, action) => {
      const { id, hasReminder } = action.payload;
      state.items[id].date.hasReminder = hasReminder;
    },
    setTimeReminder: (state, action) => {
      const { id, hasReminder } = action.payload;
      state.items[id].time.hasReminder = hasReminder;
    },
    setColor: (state, action) => {
      const { id, color } = action.payload;
      state.items[id].color = color;
    },
    remove: (state, action) => {
      const listId = state.items[action.payload].listId;

      state.sort[listId] = state.sort[listId].filter(id => id !== action.payload);
      state.dragSort[listId] = state.dragSort[listId].filter(id => id !== action.payload);
      state.items[action.payload].trash.timestamp = getUnixTimestampFromDate();
      state.items[action.payload].trash.isTrashed = true;
    },
    expunge: (state, action) => { delete state.items[action.payload]; },
    restore: (state, action) => {
      const listId = state.items[action.payload].listId;

      state.sort[listId].unshift(action.payload);
      state.dragSort[listId].unshift(action.payload);
      state.items[action.payload].trash.timestamp = null;
      state.items[action.payload].trash.isTrashed = false;
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

      const todoId = state.sort[listId][oldIndex];
      state.sort[listId].splice(oldIndex, 1);
      state.sort[listId].splice(newIndex, 0, todoId);

      // Update drag sort to the new positions to stay in sync
      state.dragSort[listId] = state.sort[listId];
    },
    reorderDrag: (state, action) => {
      const { listId, oldIndex, newIndex } = action.payload;

      const todoId = state.dragSort[listId][oldIndex];
      state.dragSort[listId].splice(oldIndex, 1);
      state.dragSort[listId].splice(newIndex, 0, todoId);
    },
    reorderToList: (state, action) => {
      const { oldListId, newListId, oldIndex, newIndex } = action.payload;

      // Get todo id
      const todoId = state.sort[oldListId][oldIndex];

      // Remove todo from current position in old sort array
      state.sort[oldListId].splice(oldIndex, 1);

      // Add todo to next position in new sort array
      state.sort[newListId].splice(newIndex, 0, todoId);

      // Update drag sort to the new positions to stay in sync
      state.dragSort[oldListId] = state.sort[oldListId];
      state.dragSort[newListId] = state.sort[newListId];

      // Update todo list id owner
      state.items[todoId].listId = newListId;
    },
    select: (state, action) => { state.selected = action.payload; }
  }
});

export { todosSlice };
