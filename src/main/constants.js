/**
 * src/main/constants.js
 *
 * Holds constants for the main application section (state management).
 */

import { TYPES } from '@src/constants';

// View options for display in the main section
const VIEWS = {
  START: 'start',
  PROJECTS: 'projects',
  TRASH: 'trash'
};

const INITIAL_NAME_TEXT = {
  [TYPES.TODO]: 'New Todo',
  [TYPES.LIST]: 'New List',
  [TYPES.PROJECT]: 'New Project'
};

export { VIEWS, INITIAL_NAME_TEXT };
