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
      activeTab: 0,
      isLoggedIn: true
    },
    projects: {
      items: { '1': { ...makeNewProject('1', '1', 'New Project') } },
      active: '1',
      removing: '',
      sort: { '1': ['1'] }
    },
    lists: {
      items: {},
      removing: '',
      selected: '',
      dropping: null,
      sort: { '1': [] }
    },
    todos: { items: {}, sort: { '1': [] }, selected: '' }
  };

  if (local) return JSON.parse(local);
  return initial;
};

export { getInitialState };
