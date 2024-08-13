/**
 * src/redux/reducers/projects.js
 *
 * Handles state slice for projects.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from '@main/getInitialState';
import { makeNewList } from '@main/lists';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: getInitialState().projects,
  reducers: {
    add: (state, action) => {
      state.items[action.payload] = makeNewList(action.payload, '1', 'Project');
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
    remove: (state, action) => {
      const userId = state.items[action.payload].userId;
      state.sort[userId] = state.sort[userId].filter(id => id !== action.payload);
      state.items[action.payload].isRemoved = true;
    },
    change: (state, action) => {
      const { id, draft } = action.payload;
      state.items[id].text.draft = draft;
    }
  }
});

export { projectsSlice };
