/**
 * src/redux/reducers/lists.js
 *
 * Handles state slice for lists.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from '../../main/getInitialState';
import { makeNewList } from '../../main/lists';

const listsSlice = createSlice({
  name: 'lists',
  initialState: getInitialState().lists,
  reducers: {
    add: (state, action) => {
      const listId = action.payload.id;
      state.items[listId] = makeNewList(listId, '1', 'Todo List');
      state.sort['1'].push(listId);
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
      const projectId = state.items[action.payload.id].projectId;
      state.sort[projectId] = state
        .sort[projectId]
        .filter(id => id !== action.payload.id);
      state.items[action.payload.id].isRemoved = true;
    },
    change: (state, action) => {
      state.items[action.payload.id].text.draft = action.payload.draft;
    },
    reorder: (state, action) => {
      const orderedId = action.payload.listId;
      state.sort['1'].splice(action.payload.oldIndex, 1);
      state.sort['1'].splice(action.payload.newIndex, 0, orderedId);
    },
    select: (state, action) => { state.selected = action.payload.id; },
    drop: (state, action) => { state.dropping = action.payload.index; }
  }
});

export { listsSlice };
