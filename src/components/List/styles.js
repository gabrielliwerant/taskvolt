/**
 * src/components/List/styles.js
 *
 * Holds reusable styles for list-related components.
 */

import { TYPES } from '@src/constants';

import {
  BORDER_OFFSET,
  LIST_PADDING,
  TOP_OFFSET,
  MARGINS,
  WIDTHS,
  COLORS
} from '@jss/constants';

const lists = {
  padding: `${TOP_OFFSET}px`,
  position: 'absolute'
};

const listItemContainer = {
  height: '100%',
  marginBottom: '30px',
  marginRight: '30px',
  position: 'relative',

  '&:last-child': {
    marginRight: 0
  }
};

const listContainer = {
  width: `${WIDTHS.TODO.MAIN + BORDER_OFFSET}px`,
  padding: `${LIST_PADDING}px ${LIST_PADDING}px ${LIST_PADDING - MARGINS[TYPES.TODO].MAIN}px ${LIST_PADDING}px`,
  background: COLORS[TYPES.LIST].BACKGROUND,
  border: `1px solid ${COLORS[TYPES.LIST].BORDER}`,
  borderRadius: '4px',

  '&:hover': {
    background: COLORS[TYPES.LIST].BACKGROUND_HOVER
  }
};

const text = {
  fontSize: '18px'
};

export { lists, listContainer, listItemContainer, text };
