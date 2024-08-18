/**
 * jss/constants.js
 *
 * Holds re-usable constants for jss stlying.
 */

import { TYPES } from '@src/constants';

const TOP_OFFSET = 30;
const BORDER_OFFSET = 2;
const LIST_WIDTH_POSITION = 372;
const LIST_PADDING = 15;

const MARGINS = {
  [TYPES.TODO]: {
    MAIN: 4,
    PLACEHOLDER: 73
  }
};

const HEIGHTS = {
  [TYPES.TODO]: {
    MAIN: 50,
    PLACEHOLDER: 46,
    INPUT: 32
  },
  [TYPES.LIST]: {
    INPUT: 41
  },
  [TYPES.PROJECT]: {
    MAIN: 40,
    INPUT: 48
  }
};

const WIDTHS = {
  [TYPES.TODO]: {
    MAIN: 308
  },
  [TYPES.LIST]: {
    MAIN: 340
  },
  [TYPES.PROJECT]: {
    MAIN: 340
  }
};

const Z_INDEX = {
  ITEM_PLACEHOLDER: 2,
  LIST_PLACEHOLDER: 0,
  TODO: 3,
  LIST: 1,
  NAV_BAR: 10
};

const COLORS = {
  [TYPES.TODO]: {
    BORDER: '#bbbbbb',
    BACKGROUND_COMPLETE: { START: '#fefefe', STOP: '#ededed'},
    BACKGROUND_COMPLETE_HOVER: { START: '#eeeeee', STOP: '#dddddd'},
    BACKGROUND_DEFAULT: { START: '#eeeeee', STOP: '#dddddd'},
    BACKGROUND_DEFAULT_HOVER: { START: '#dddddd', STOP: '#cccccc'}
  },
  [TYPES.LIST]: {
    BACKGROUND: '#f7f7f7',
    BACKGROUND_HOVER: '#f2f2f2',
    BORDER: '#cccccc'
  }
};

export {
  TOP_OFFSET,
  BORDER_OFFSET,
  LIST_WIDTH_POSITION,
  LIST_PADDING,
  MARGINS,
  HEIGHTS,
  WIDTHS,
  Z_INDEX,
  COLORS
};
