/**
 * src/redux/reducers/projects.js
 *
 * Handles state slice for projects.
 */

import { createSlice } from '@reduxjs/toolkit';

import { makeId } from '@src/utils';
import { getInitialState } from '@main/getInitialState';
import { makeNewProject } from '@main/projects';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: getInitialState().projects,
  reducers: {
    add: (state, action) => {
      const id = makeId();
      state.items[id] = makeNewProject(id, '1', 'New Project');
      state.sort['1'].push(id);
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
