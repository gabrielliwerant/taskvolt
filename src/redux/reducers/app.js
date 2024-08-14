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
    setView: (state, action) => { state.view = action.payload; }
  }
});

export { appSlice };
