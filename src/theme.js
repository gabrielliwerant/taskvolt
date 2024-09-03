/**
 * src/theme.js
 *
 * Handles theme concerns, like colors, for the app.
 */

import { createTheme } from '@mui/material/styles';
import { red, yellow, grey, green, blue } from '@mui/material/colors';

import { TYPES } from '@src/constants';

// Possible color types
const COLOR_OPTIONS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
  WHITE: 'white',
  BLACK: 'black'
};

const COLORS_MAIN = {
  [COLOR_OPTIONS.PRIMARY]: '#009be3',
  [COLOR_OPTIONS.WHITE]: '#ffffff',
  [COLOR_OPTIONS.BLACK]: '#000000'
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS_MAIN[COLOR_OPTIONS.PRIMARY]
    },
    secondary: {
      main: grey[700]
    },
    [COLOR_OPTIONS.ERROR]: {
      main: red[400]
    },
    [COLOR_OPTIONS.WARNING]: {
      main: yellow[400]
    },
    [COLOR_OPTIONS.SUCCESS]: {
      main: green[600]
    },
    [COLOR_OPTIONS.INFO]: {
      main: blue[400]
    },
    [COLOR_OPTIONS.WHITE]: {
      main: COLORS_MAIN[COLOR_OPTIONS.WHITE]
    },
    [COLOR_OPTIONS.BLACK]: {
      main: COLORS_MAIN[COLOR_OPTIONS.BLACK]
    },
    contrastText: COLORS_MAIN[COLOR_OPTIONS.WHITE]
  },
  typography: {
    fontDisplay: 'optional',
    'body1': {
      lineHeight: '1.25'
    },
    'body2': {
      lineHeight: '1.25'
    }
  }
});

/**
 * Determine based on color whether or not we should use contrasting color for foreground elements.
 *
 * @param {string} color COLOR_OPTIONS
 * @returns {boolean}
 */
const shouldContrast = color =>
  color !== COLOR_OPTIONS.PRIMARY && color !== COLOR_OPTIONS.WARNING;

// Handles adjustable colors for todos.
const ITEM_COLORS = {
  [TYPES.TODO]: {
    [COLOR_OPTIONS.PRIMARY]: {
      BORDER: grey[500],
      BORDER_HOVER: grey[600],
      BACKGROUND_COMPLETE: { START: grey[100], STOP: grey[100] },
      BACKGROUND_COMPLETE_HOVER: { START: grey[200], STOP: grey[200] },
      BACKGROUND_DEFAULT: { START: grey[300], STOP: grey[300] },
      BACKGROUND_DEFAULT_HOVER: { START: grey[400], STOP: grey[400] },
      PLACEHOLDER: {
        BORDER: grey[700],
        BACKGROUND: grey[500]
      }
    },
    [COLOR_OPTIONS.SECONDARY]: {
      BORDER: grey[900],
      BORDER_HOVER: grey[900],
      BACKGROUND_COMPLETE: { START: grey[500], STOP: grey[500] },
      BACKGROUND_COMPLETE_HOVER: { START: grey[600], STOP: grey[600] },
      BACKGROUND_DEFAULT: { START: grey[700], STOP: grey[700] },
      BACKGROUND_DEFAULT_HOVER: { START: grey[800], STOP: grey[800] },
      PLACEHOLDER: {
        BORDER: grey[900],
        BACKGROUND: grey[800]
      }
    },
    [COLOR_OPTIONS.ERROR]: {
      BORDER: red[800],
      BORDER_HOVER: red[900],
      BACKGROUND_COMPLETE: { START: red[200], STOP: red[200] },
      BACKGROUND_COMPLETE_HOVER: { START: red[300], STOP: red[300] },
      BACKGROUND_DEFAULT: { START: red[400], STOP: red[400] },
      BACKGROUND_DEFAULT_HOVER: { START: red[600], STOP: red[600] },
      PLACEHOLDER: {
        BORDER: red[900],
        BACKGROUND: red[800]
      }
    },
    [COLOR_OPTIONS.WARNING]: {
      BORDER: yellow[600],
      BORDER_HOVER: yellow[700],
      BACKGROUND_COMPLETE: { START: yellow[100], STOP: yellow[100] },
      BACKGROUND_COMPLETE_HOVER: { START: yellow[200], STOP: yellow[200] },
      BACKGROUND_DEFAULT: { START: yellow[300], STOP: yellow[300] },
      BACKGROUND_DEFAULT_HOVER: { START: yellow[500], STOP: yellow[500] },
      PLACEHOLDER: {
        BORDER: yellow[800],
        BACKGROUND: yellow[600]
      }
    },
    [COLOR_OPTIONS.SUCCESS]: {
      BORDER: green[800],
      BORDER_HOVER: green[900],
      BACKGROUND_COMPLETE: { START: green[400], STOP: green[400]},
      BACKGROUND_COMPLETE_HOVER: { START: green[500], STOP: green[500]},
      BACKGROUND_DEFAULT: { START: green[600], STOP: green[600] },
      BACKGROUND_DEFAULT_HOVER: { START: green[800], STOP: green[800] },
      PLACEHOLDER: {
        BORDER: green[900],
        BACKGROUND: green[800]
      }
    },
    [COLOR_OPTIONS.INFO]: {
      BORDER: blue[700],
      BORDER_HOVER: blue[800],
      BACKGROUND_COMPLETE: { START: blue[200], STOP: blue[200] },
      BACKGROUND_COMPLETE_HOVER: { START: blue[300], STOP: blue[300] },
      BACKGROUND_DEFAULT: { START: blue[400], STOP: blue[400] },
      BACKGROUND_DEFAULT_HOVER: { START: blue[600], STOP: blue[600] },
      PLACEHOLDER: {
        BORDER: blue[900],
        BACKGROUND: blue[700]
      }
    }
  },
  [TYPES.LIST]: {
    BACKGROUND: grey[100],
    BACKGROUND_HOVER: grey[200],
    BORDER: grey[400],
    BORDER_HOVER: grey[500],
    PLACEHOLDER: {
      BORDER: grey[600],
      BACKGROUND: grey[400]
    }
  }
};

export { theme, shouldContrast, COLOR_OPTIONS, ITEM_COLORS };
