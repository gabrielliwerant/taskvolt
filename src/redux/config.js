/**
 * src/config.js
 *
 * Handle initial setup of redux store.
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { todosSlice } from './reducers/todos';
import { listsSlice } from './reducers/lists';
import { projectsSlice } from './reducers/projects';
import { appSlice } from './reducers/app';
import { LOCAL_STORAGE_KEY } from '../constants';

/**
 * Store todo data in local storage after latest state reduce.
 *
 * @param {object} action
 * @returns {object} action
 */
const storeLocal = store => next => action => {
  const nextAction = next(action);

  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(store.getState())
  );

  return nextAction;
};

const store = configureStore({
  reducer: combineReducers({
    todos: todosSlice.reducer,
    lists: listsSlice.reducer,
    projects: projectsSlice.reducer,
    app: appSlice.reducer
  }),
  middleware: [storeLocal]
});

const getState = name => store.getState()[name];

export { store, getState };
