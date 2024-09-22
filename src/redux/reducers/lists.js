/**
 * src/redux/reducers/lists.js
 *
 * Handles state slice for lists.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getUnixTimestampFromDate } from '@src/utils';
import { TYPES } from '@src/constants';
import { getInitialState } from '@main/getInitialState';
import { makeNewList } from '@main/lists';
import { INITIAL_NAME_TEXT } from '@main/constants';

const listsSlice = createSlice({
  name: 'lists',
  initialState: getInitialState().lists,
  reducers: {
    add: (state, action) => {
      const { listId, projectId } = action.payload;

      state.items[listId] = makeNewList(listId, projectId, INITIAL_NAME_TEXT[TYPES.LIST]);
      state.sort[projectId].push(listId);
      state.dragSort[projectId].push(listId);
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
    initRemove: (state, action) => { state.removing = action.payload; },
    remove: (state, action) => {
      const projectId = state.items[action.payload].projectId;

      state.sort[projectId] = state.sort[projectId].filter(id => id !== action.payload);
      state.dragSort[projectId] = state.dragSort[projectId].filter(id => id !== action.payload);
      state.items[action.payload].trash.timestamp = getUnixTimestampFromDate();
      state.items[action.payload].trash.isTrashed = true;
    },
    expunge: (state, action) => { delete state.items[action.payload]; },
    restore: (state, action) => {
      const projectId = state.items[action.payload].projectId;

      state.sort[projectId].push(action.payload);
      state.dragSort[projectId].push(action.payload);
      state.items[action.payload].trash.timestamp = null;
      state.items[action.payload].trash.isTrashed = false;
    },
    change: (state, action) => {
      const { id, draft } = action.payload;

      state.items[id].text.draft = draft;
    },
    reorder: (state, action) => {
      const { listId, projectId, oldIndex, newIndex } = action.payload;

      state.sort[projectId].splice(oldIndex, 1);
      state.sort[projectId].splice(newIndex, 0, listId);
    },
    reorderDrag: (state, action) => {
      const { listId, projectId, oldIndex, newIndex } = action.payload;

      state.dragSort[projectId].splice(oldIndex, 1);
      state.dragSort[projectId].splice(newIndex, 0, listId);
    },
    select: (state, action) => { state.selected = action.payload; }
  }
});

export { listsSlice };
