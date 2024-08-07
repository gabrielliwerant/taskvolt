/**
 * src/redux/reducers/projects.js
 *
 * Handles state slice for projects.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from '../../main/getInitialState';
import { makeNewList } from '../../main/lists';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: getInitialState().projects,
  reducers: {
    add: (state, action) => {
      const projectId = action.payload.id;
      state.items[projectId] = makeNewList(projectId, '1', 'Project');
      state.sort['1'].push(projectId);
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
      const userId = state.items[action.payload.id].userId;
      state.sort[userId] = state
        .sort[userId]
        .filter(id => id !== action.payload.id);
      state.items[action.payload.id].isRemoved = true;
    },
    change: (state, action) => {
      state.items[action.payload.id].text.draft = action.payload.draft;
    }
  }
});

export { projectsSlice };
