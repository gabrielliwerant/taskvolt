/**
 * src/constants.js
 *
 * Hold re-usable constants for the app.
 */

const LOCAL_STORAGE_KEY = 'TASKVOLT';

const TYPES = {
  TODO: 'TODO',
  LIST: 'LIST',
  PROJECT: 'PROJECT'
};

// Maximum number of characters to allow editing/saving item names
const MAX_LENGTH_INPUT = {
  [TYPES.TODO]: 111,
  [TYPES.LIST]: 45,
  [TYPES.PROJECT]: 21
};

// The maximum number of characters (string length) for a given number of lines of text.
const MAX_LENGTH_PER_LINE = {
  [TYPES.TODO]: {
    TWO: 45,
    THREE: 67,
    FOUR: 89,
    FIVE: 111
  }
};

// Reusable date format for display purposes
const DATE_FORMAT = 'ddd, MMM D';

export { LOCAL_STORAGE_KEY, TYPES, MAX_LENGTH_INPUT, MAX_LENGTH_PER_LINE, DATE_FORMAT };
