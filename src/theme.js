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
      main: green[500]
    },
    [COLOR_OPTIONS.INFO]: {
      main: blue[400]
    },
    [COLOR_OPTIONS.WHITE]: {
      main: COLORS_MAIN[COLOR_OPTIONS.WHITE]
    },
    contrastText: COLORS_MAIN[COLOR_OPTIONS.WHITE]
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
    FONT: COLORS_MAIN[COLOR_OPTIONS.DARK],
    [COLOR_OPTIONS.PRIMARY]: {
      BORDER: grey[500],
      BACKGROUND_COMPLETE: { START: grey[100], STOP: grey[100] },
      BACKGROUND_COMPLETE_HOVER: { START: grey[200], STOP: grey[200] },
      BACKGROUND_DEFAULT: { START: grey[300], STOP: grey[300] },
      BACKGROUND_DEFAULT_HOVER: { START: grey[400], STOP: grey[400] },
      BACKGROUND_LABEL: { START: grey[400], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      BACKGROUND_LABEL_HOVER: { START: grey[500], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      PLACEHOLDER: {
        BORDER: grey[700],
        BACKGROUND: grey[500]
      }
    },
    [COLOR_OPTIONS.SECONDARY]: {
      FONT: COLORS_MAIN[COLOR_OPTIONS.WHITE],
      BORDER: grey[900],
      BACKGROUND_COMPLETE: { START: grey[500], STOP: grey[500] },
      BACKGROUND_COMPLETE_HOVER: { START: grey[600], STOP: grey[600] },
      BACKGROUND_DEFAULT: { START: grey[700], STOP: grey[700] },
      BACKGROUND_DEFAULT_HOVER: { START: grey[800], STOP: grey[800] },
      BACKGROUND_LABEL: { START: grey[700], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      BACKGROUND_LABEL_HOVER: { START: grey[800], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      PLACEHOLDER: {
        BORDER: COLORS_MAIN[COLOR_OPTIONS.BLACK],
        BACKGROUND: grey[800]
      }
    },
    [COLOR_OPTIONS.ERROR]: {
      FONT: COLORS_MAIN[COLOR_OPTIONS.WHITE],
      BORDER: red[800],
      BACKGROUND_COMPLETE: { START: red[200], STOP: red[200] },
      BACKGROUND_COMPLETE_HOVER: { START: red[300], STOP: red[300] },
      BACKGROUND_DEFAULT: { START: red[400], STOP: red[400] },
      BACKGROUND_DEFAULT_HOVER: { START: red[500], STOP: red[500] },
      BACKGROUND_LABEL: { START: red[500], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      BACKGROUND_LABEL_HOVER: { START: red[400], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      PLACEHOLDER: {
        BORDER: red[900],
        BACKGROUND: red[600]
      }
    },
    [COLOR_OPTIONS.WARNING]: {
      FONT: COLORS_MAIN[COLOR_OPTIONS.WHITE],
      BORDER: yellow[600],
      BACKGROUND_COMPLETE: { START: yellow[200], STOP: yellow[200] },
      BACKGROUND_COMPLETE_HOVER: { START: yellow[300], STOP: yellow[300] },
      BACKGROUND_DEFAULT: { START: yellow[400], STOP: yellow[400] },
      BACKGROUND_DEFAULT_HOVER: { START: yellow[500], STOP: yellow[500] },
      BACKGROUND_LABEL: { START: yellow[300], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      BACKGROUND_LABEL_HOVER: { START: yellow[400], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      PLACEHOLDER: {
        BORDER: yellow[700],
        BACKGROUND: yellow[600]
      }
    },
    [COLOR_OPTIONS.SUCCESS]: {
      FONT: COLORS_MAIN[COLOR_OPTIONS.WHITE],
      BORDER: green[700],
      BACKGROUND_COMPLETE: { START: green[300], STOP: green[300]},
      BACKGROUND_COMPLETE_HOVER: { START: green[400], STOP: green[400]},
      BACKGROUND_DEFAULT: { START: green[500], STOP: green[500] },
      BACKGROUND_DEFAULT_HOVER: { START: green[600], STOP: green[600] },
      BACKGROUND_LABEL: { START: green[500], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      BACKGROUND_LABEL_HOVER: { START: green[600], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      PLACEHOLDER: {
        BORDER: green[900],
        BACKGROUND: green[700]
      }
    },
    [COLOR_OPTIONS.INFO]: {
      FONT: COLORS_MAIN[COLOR_OPTIONS.WHITE],
      BORDER: blue[700],
      BACKGROUND_COMPLETE: { START: blue[200], STOP: blue[200] },
      BACKGROUND_COMPLETE_HOVER: { START: blue[300], STOP: blue[300] },
      BACKGROUND_DEFAULT: { START: blue[400], STOP: blue[400] },
      BACKGROUND_DEFAULT_HOVER: { START: blue[500], STOP: blue[500] },
      BACKGROUND_LABEL: { START: blue[400], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
      BACKGROUND_LABEL_HOVER: { START: blue[500], STOP: COLORS_MAIN[COLOR_OPTIONS.WHITE] },
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
    PLACEHOLDER: {
      BORDER: grey[600],
      BACKGROUND: grey[400]
    }
  }
};

export { theme, shouldContrast, COLOR_OPTIONS, ITEM_COLORS };
