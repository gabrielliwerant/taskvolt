/**
 * src/redux/reducers/lists.js
 *
 * Handles state slice for lists.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from '@main/getInitialState';
import { makeNewList } from '@main/lists';

const listsSlice = createSlice({
  name: 'lists',
  initialState: getInitialState().lists,
  reducers: {
    add: (state, action) => {
      state.items[action.payload] = makeNewList(action.payload, '1', 'Todo List');
      state.sort['1'].push(action.payload);
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
    initRemove: (state, action) => { state.removing = action.payload; },
    remove: (state, action) => {
      const projectId = state.items[action.payload].projectId;

      state.sort[projectId] = state.sort[projectId].filter(id => id !== action.payload);
      state.items[action.payload].isRemoved = true;
    },
    change: (state, action) => {
      const { id, draft } = action.payload;

      state.items[id].text.draft = draft;
    },
    reorder: (state, action) => {
      const { id, oldIndex, newIndex } = action.payload;

      state.sort['1'].splice(oldIndex, 1);
      state.sort['1'].splice(newIndex, 0, id);
    },
    select: (state, action) => { state.selected = action.payload; },
    drop: (state, action) => { state.dropping = action.payload; }
  }
});

export { listsSlice };
