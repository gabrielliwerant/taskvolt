/**
 * config.js
 *
 * Handle initial setup of redux store.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { todosSlice, listSlice } from './reducers';

const store = configureStore({
  reducer: combineReducers({
    todos: todosSlice.reducer,
    list: listSlice.reducer
  }),
  middleware: []
});

const getState = name => store.getState()[name];

export { store, getState };
