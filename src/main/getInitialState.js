/**
 * src/main/getInitialState.js
 *
 * Retrieves the initial state of the application.
 */

import { LOCAL_STORAGE_KEY } from '@src/constants';

import { makeNewProject } from './projects';
import { VIEWS } from './constants';

/**
 * Retrieve data from local storage or initial data structure.
 *
 * @returns {object}
 */
const getInitialState = () => {
  const local = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const initial = {
    app: {
      view: VIEWS.PROJECTS,
      activeTab: false,
      isLoggedIn: true,
      user: {
        id: '1',
        email: ''
      }
    },
    projects: {
      items: {},
      active: '',
      removing: '',
      sort: []
    },
    lists: {
      items: {},
      removing: '',
      selected: '',
      dropping: null,
      sort: {}
    },
    todos: {
      items: {},
      selected: '',
      dropping: null,
      sort: {}
    }
  };

  if (local) return JSON.parse(local);
  return initial;
};

export { getInitialState };
