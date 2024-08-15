/**
 * src/components/List/styles.js
 *
 * Holds reusable styles for list-related components.
 */

import { TYPES } from '@src/constants';

import { BORDER_OFFSET, LIST_PADDING, TOP_OFFSET, MARGINS, WIDTHS, Z_INDEX } from '@jss/constants';

const lists = {
  display: 'flex',
  justifyContent: 'center',
  padding: `${TOP_OFFSET}px`,
  position: 'absolute'
};

const listItemContainer = {
  height: '100%',
  marginBottom: '30px',
  marginRight: '30px',
  position: 'relative',
  zIndex: Z_INDEX.LIST,
  '&:last-child': {
    marginRight: 0
  }
};

const listContainer = {
  width: `${WIDTHS.TODO.MAIN + BORDER_OFFSET}px`,
  padding: `${LIST_PADDING}px ${LIST_PADDING}px ${LIST_PADDING - MARGINS[TYPES.TODO].MAIN}px ${LIST_PADDING}px`,
  background: '#f7f7f7',
  border: '1px solid #cccccc',
  borderRadius: '4px',

  '&:hover': {
    background: '#f2f2f2'
  }
};

const listTitleContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const text = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px'
};

export { lists, listItemContainer, listContainer, listTitleContainer, text };
