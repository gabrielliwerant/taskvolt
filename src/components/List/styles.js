/**
 * src/components/List/styles.js
 *
 * Holds reusable styles for list-related components.
 */

import { ITEM_COLORS } from '@src/theme';
import { TYPES } from '@src/constants';

import {
  BORDER_OFFSET,
  LIST_PADDING,
  TOP_OFFSET,
  MARGINS,
  WIDTHS,
  ANIMATION_TIMES
} from '@jss/constants';

const lists = {
  padding: `${TOP_OFFSET}px`,
  position: 'absolute'
};

const listItemContainer = {
  height: '100%',
  marginBottom: '30px',
  marginRight: '30px',
  position: 'relative'
};

const listContainer = {
  width: `${WIDTHS.TODO.MAIN + BORDER_OFFSET}px`,
  padding: `${LIST_PADDING}px ${LIST_PADDING}px ${LIST_PADDING - MARGINS[TYPES.TODO].MAIN}px ${LIST_PADDING}px`,
  borderRadius: '4px',
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-out`,
  background: ITEM_COLORS[TYPES.LIST].BACKGROUND,
  border: `1px solid ${ITEM_COLORS[TYPES.LIST].BORDER}`,

  '&:hover': {
    background: ITEM_COLORS[TYPES.LIST].BACKGROUND_HOVER,
    border: `1px solid ${ITEM_COLORS[TYPES.LIST].BORDER_HOVER}`,
    transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`
  }
};

const text = {
  fontSize: '18px'
};

export { lists, listContainer, listItemContainer, text };
