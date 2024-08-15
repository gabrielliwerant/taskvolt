/**
 * src/redux/reducers/app.js
 *
 * Handles state slice for app.
 */

import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from '@main/getInitialState';

const appSlice = createSlice({
  name: 'app',
  initialState: getInitialState().app,
  reducers: {
    setView: (state, action) => { state.view = action.payload; },
    setActiveTab: (state, action) => { state.activeTab = action.payload; },
    login: (state, action) => { state.isLoggedIn = true; },
    logout: (state, action) => { state.isLoggedIn = false; }
  }
});

export { appSlice };
