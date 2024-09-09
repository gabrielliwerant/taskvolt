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
      ui: {
        view: VIEWS.START,
        activeTab: false
      },
      user: {
        id: '1',
        email: '',
        isLoggedIn: false
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
      dragSort: {},
      sort: {}
    },
    todos: {
      items: {},
      selected: '',
      isCompleting: false,
      dragSort: {},
      sort: {}
    }
  };

  if (local) return JSON.parse(local);
  return initial;
};

export { getInitialState };
