/**
 * src/components/Todo/styles.js
 *
 * Holds reusable styles for todo-related components.
 */

import { TYPES } from '@src/constants';

import {
  BORDER_OFFSET,
  LIST_PADDING,
  MARGINS,
  HEIGHTS,
  WIDTHS,
  Z_INDEX,
  COLORS
} from '@jss/constants';

const todos = {
  marginTop: `${LIST_PADDING}px`
};

const complete = {
  textDecoration: 'line-through',
  opacity: '0.5'
};

const todoContainer = {
  padding: '0 4px 4px 4px',
  border: `1px solid ${COLORS[TYPES.TODO].BORDER}`,
  borderRadius: '4px',
  width: '300px',
  display: 'flex',
  alignItems: 'center'
};

const todoContainerPaddingWithDatetime = {
  paddingTop: '11px'
};

const todoContainerPaddingWithoutDatetime = {
  paddingTop: '4px'
};

const item = {
  cursor: 'grab',
  width: `${WIDTHS.TODO.MAIN + BORDER_OFFSET}px`,
  height: `${HEIGHTS.TODO.MAIN}px`,
  border: '1px solid transparent',
  marginBottom: `${MARGINS[TYPES.TODO].MAIN}px`,
  position: 'relative',
  zIndex: Z_INDEX.TODO,

  '&:focus': {
    outline: 'none'
  }
};

const completeBackdrop = {
  background: `linear-gradient(0.5turn,
    ${COLORS[TYPES.TODO].BACKGROUND_COMPLETE.START},
    ${COLORS[TYPES.TODO].BACKGROUND_COMPLETE.STOP},
    ${COLORS[TYPES.TODO].BACKGROUND_COMPLETE.START})`,

  '&:hover': {
    background: `linear-gradient(0.5turn,
      ${COLORS[TYPES.TODO].BACKGROUND_COMPLETE_HOVER.START},
      ${COLORS[TYPES.TODO].BACKGROUND_COMPLETE_HOVER.STOP},
      ${COLORS[TYPES.TODO].BACKGROUND_COMPLETE_HOVER.START})`
  }
};

const defaultBackdrop = {
  background: `linear-gradient(0.5turn,
    ${COLORS[TYPES.TODO].BACKGROUND_DEFAULT.START},
    ${COLORS[TYPES.TODO].BACKGROUND_DEFAULT.STOP},
    ${COLORS[TYPES.TODO].BACKGROUND_DEFAULT.START})`,

  '&:hover': {
    background: `linear-gradient(0.5turn,
      ${COLORS[TYPES.TODO].BACKGROUND_DEFAULT_HOVER.START},
      ${COLORS[TYPES.TODO].BACKGROUND_DEFAULT_HOVER.STOP},
      ${COLORS[TYPES.TODO].BACKGROUND_DEFAULT_HOVER.START})`
  }
};

export {
  todos,
  complete,
  todoContainerPaddingWithDatetime,
  todoContainerPaddingWithoutDatetime,
  todoContainer,
  item,
  completeBackdrop,
  defaultBackdrop
};
