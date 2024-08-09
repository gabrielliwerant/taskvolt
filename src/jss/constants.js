/**
 * jss/constants.js
 *
 * Holds re-usable constants for jss stlying.
 */

import { TYPES } from '@src/constants';

const TOP_OFFSET = 90;
const BORDER_OFFSET = 2;
const TODO_MARGIN = 4;
const TODO_HEIGHT_POSITION = 63;
const LIST_WIDTH_POSITION = 372;
const LIST_PADDING = 15;

const HEIGHTS = {
  [TYPES.TODO]: {
    MAIN: 39,
    INPUT: 22
  },
  [TYPES.LIST]: {
    INPUT: 25
  }
};

const WIDTHS = {
  [TYPES.TODO]: {
    MAIN: 308,
    INPUT: 190
  },
  [TYPES.LIST]: {
    MAIN: 340,
    INPUT: 216
  }
};

const Z_INDEX = {
  ITEM_PLACEHOLDER: 2,
  LIST_PLACEHOLDER: 0,
  TODO: 3,
  LIST: 1,
  NAV_BAR: 10
};

export {
  TOP_OFFSET,
  BORDER_OFFSET,
  TODO_MARGIN,
  TODO_HEIGHT_POSITION,
  LIST_WIDTH_POSITION,
  LIST_PADDING,
  HEIGHTS,
  WIDTHS,
  Z_INDEX
};
