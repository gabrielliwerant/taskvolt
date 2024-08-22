/**
 * src/components/Todo/styles.js
 *
 * Holds reusable styles for todo-related components.
 */

import { COLOR_OPTIONS, ITEM_COLORS } from '@src/theme';
import { TYPES } from '@src/constants';

import { BORDER_OFFSET, LIST_PADDING, MARGINS, WIDTHS, Z_INDEX } from '@jss/constants';

const todos = {
  marginTop: `${LIST_PADDING}px`,

  '& > li': {
    marginBottom: '4px'
  }
};

const complete = {
  textDecoration: 'line-through',
  opacity: '0.5'
};

const todoContainer = (color = COLOR_OPTIONS.PRIMARY) => ({
  padding: '8px 4px',
  border: `1px solid ${ITEM_COLORS[TYPES.TODO][color].BORDER}`,
  borderRadius: '4px',
  width: '300px'
});

const item = {
  cursor: 'grab',
  width: `${WIDTHS.TODO.MAIN + BORDER_OFFSET}px`,
  position: 'relative',
  zIndex: Z_INDEX.TODO,

  '&:focus': {
    outline: 'none'
  }
};

const completeBackdrop = (color = COLOR_OPTIONS.PRIMARY) => ({
  background: `linear-gradient(0.5turn,
    ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE.START},
    ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE.STOP},
    ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE.START})`,

  '&:hover': {
    background: `linear-gradient(0.5turn,
      ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE_HOVER.START},
      ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE_HOVER.STOP},
      ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE_HOVER.START})`
  }
});

const defaultBackdrop = (color = COLOR_OPTIONS.PRIMARY) => ({
  background: `linear-gradient(0.5turn,
    ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT.START},
    ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT.STOP},
    ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT.START})`,

  '&:hover': {
    background: `linear-gradient(0.5turn,
      ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT_HOVER.START},
      ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT_HOVER.STOP},
      ${ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT_HOVER.START})`
  }
});

export { todos, complete, todoContainer, item, completeBackdrop, defaultBackdrop };
