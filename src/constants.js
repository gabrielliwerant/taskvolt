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
  [TYPES.TODO]: 'body2',
  [TYPES.LIST]: 'body1',
  [TYPES.PROJECT]: 'h6'
};

// Maximum number of characters to allow editing/saving item names
const MAX_LENGTH_INPUT = {
  [TYPES.TODO]: 256,
  [TYPES.LIST]: 64,
  [TYPES.PROJECT]: 32
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
  DATE_FORMAT,
  TIME_FORMAT,
  TIME_FORMAT_WITH_AM_PM,
  TIME_FORMAT_ONLY_AM_PM
};
