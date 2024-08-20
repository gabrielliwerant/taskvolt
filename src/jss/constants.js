/**
 * jss/constants.js
 *
 * Holds re-usable constants for jss stlying.
 */

import { TYPES } from '@src/constants';

// Map number of lines of text to the corresponding height value
// TODO: Make this data driven instead of hard-coded
const LINES_TO_HEIGHT = {
  [TYPES.TODO]: {
    TWO: 48,
    THREE: 67,
    FOUR: 86,
    FIVE: 105
  }
};

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
  TODO_PLACEHOLDER: 2,
  LIST_PLACEHOLDER: 0,
  TODO: 3,
  LIST: 1,
  NAV_BAR: 10
};

const COLORS = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  [TYPES.TODO]: {
    BORDER: '#bbbbbb',
    BACKGROUND_COMPLETE: { START: '#fefefe', STOP: '#ededed'},
    BACKGROUND_COMPLETE_HOVER: { START: '#eeeeee', STOP: '#dddddd'},
    BACKGROUND_DEFAULT: { START: '#eeeeee', STOP: '#dddddd'},
    BACKGROUND_DEFAULT_HOVER: { START: '#dddddd', STOP: '#cccccc'},
    BACKGROUND_LABEL: { START: '#eaeaea', STOP: '#ffffff' },
    BACKGROUND_LABEL_HOVER: { START: '#d9d9d9', STOP: '#ffffff' },
    BACKGROUND_TEXT_FIELD: '#ffffff',
    PLACEHOLDER: {
      BORDER: '#aaaaaa',
      BACKGROUND: '#dddddd'
    }
  },
  [TYPES.LIST]: {
    BACKGROUND: '#f7f7f7',
    BACKGROUND_HOVER: '#f2f2f2',
    BORDER: '#cccccc',
    BACKGROUND_TEXT_FIELD: '#ffffff',
    PLACEHOLDER: {
      BORDER: '#cccccc',
      BACKGROUND: '#efefef'
    }
  },
  [TYPES.PROJECT]: {
    BACKGROUND_TEXT_FIELD: '#ffffff'
  }
};

export {
  LINES_TO_HEIGHT,
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
