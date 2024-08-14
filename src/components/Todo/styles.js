/**
 * src/components/Todo/styles.js
 *
 * Holds reusable styles for todo-related components.
 */

import { TYPES } from '@src/constants';

import { BORDER_OFFSET, LIST_PADDING, MARGINS, HEIGHTS, WIDTHS, Z_INDEX } from '@jss/constants';

const todos = {
  marginTop: `${LIST_PADDING}px`
};

const complete = {
  textDecoration: 'line-through',
  opacity: '0.5'
};

const itemContainer = {
  padding: '4px',
  border: '1px solid #bbbbbb',
  borderRadius: '4px',
  width: '300px',
  display: 'flex',
  alignItems: 'center'
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
  background: 'linear-gradient(0.5turn, #fefefe, #ededed, #fefefe)',

  '&:hover': {
    background: 'linear-gradient(0.5turn, #eeeeee, #dddddd, #eeeeee)'
  }
};

const defaultBackdrop = {
  background: 'linear-gradient(0.5turn, #eeeeee, #dddddd, #eeeeee)',

  '&:hover': {
    background: 'linear-gradient(0.5turn, #dddddd, #cccccc, #dddddd)'
  }
};

export { todos, complete, itemContainer, item, completeBackdrop, defaultBackdrop };
