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
    setView: (state, action) => { state.ui.view = action.payload; },
    setActiveTab: (state, action) => { state.ui.activeTab = action.payload; },
    login: (state, action) => { state.user.isLoggedIn = true; },
    logout: (state, action) => { state.user.isLoggedIn = false; }
  }
});

export { appSlice };
