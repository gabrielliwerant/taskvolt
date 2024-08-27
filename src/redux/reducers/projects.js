/**
 * src/redux/reducers/projects.js
 *
 * Handles state slice for projects.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getUnixTimestampFromDate } from '@src/utils';
import { getInitialState } from '@main/getInitialState';
import { makeNewProject } from '@main/projects';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: getInitialState().projects,
  reducers: {
    add: (state, action) => {
      state.items[action.payload] = makeNewProject(action.payload, 'New Project');
      state.sort.push(action.payload);
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
    setRemoving: (state, action) => { state.removing = action.payload; },
    remove: (state, action) => {
      state.sort = state.sort.filter(id => id !== action.payload);
      state.items[action.payload].trash.timestamp = getUnixTimestampFromDate();
      state.items[action.payload].trash.isTrashed = true;
    },
    restore: (state, action) => {
      state.sort.push(action.payload);
      state.items[action.payload].trash.timestamp = null;
      state.items[action.payload].trash.isTrashed = false;
    },
    change: (state, action) => {
      const { id, draft } = action.payload;
      state.items[id].text.draft = draft;
    },
    reorder: (state, action) => {
      const { id, oldIndex, newIndex } = action.payload;

      state.sort.splice(oldIndex, 1);
      state.sort.splice(newIndex, 0, id);
    },
    setActive: (state, action) => { state.active = action.payload; }
  }
});

export { projectsSlice };
