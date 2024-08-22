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

const TYPE_TO_TYPOGRAPHY_VARIANT = {
  [TYPES.TODO]: 'body1',
  [TYPES.LIST]: 'body1',
  [TYPES.PROJECT]: 'h6'
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
// Reusable time formats for display purposes
const TIME_FORMAT = 'hh:mm';
const TIME_FORMAT_WITH_AM_PM = 'h:mm A';
const TIME_FORMAT_ONLY_AM_PM = 'A';

export {
  LOCAL_STORAGE_KEY,
  TYPES,
  TYPE_TO_TYPOGRAPHY_VARIANT,
  MAX_LENGTH_INPUT,
  MAX_LENGTH_PER_LINE,
  DATE_FORMAT,
  TIME_FORMAT,
  TIME_FORMAT_WITH_AM_PM,
  TIME_FORMAT_ONLY_AM_PM
};
