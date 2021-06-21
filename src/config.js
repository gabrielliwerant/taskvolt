/**
 * config.js
 *
 * Handle initial setup of redux store.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { todosSlice, listSlice } from './reducers';
import { LOCAL_STORAGE_KEY } from './constants';

const storeLocal = store => next => action => {
  const reduced = next(action);
  
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(store.getState())
  );

  return reduced;
};

const store = configureStore({
  reducer: combineReducers({
    todos: todosSlice.reducer,
    list: listSlice.reducer
  }),
  middleware: [storeLocal]
});

const getState = name => store.getState()[name];

export { LOCAL_STORAGE_KEY, store, getState };
