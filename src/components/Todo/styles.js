/**
 * src/components/Todo/styles.js
 *
 * Holds reusable styles for todo-related components.
 */

import { COLOR_OPTIONS, ITEM_COLORS } from '@src/theme';
import { TYPES } from '@src/constants';

import {
  BORDER_OFFSET,
  LIST_PADDING,
  MARGINS,
  WIDTHS,
  ANIMATION_TIMES,
  Z_INDEX
} from '@jss/constants';
import { getBackground } from '@components/Todo/utils';

const todos = {
  '& > li': {
    marginBottom: `${MARGINS[TYPES.TODO].MAIN}px`
  }
};

const items = {
  marginTop: `${LIST_PADDING}px`
};

const todoContainer = (color = COLOR_OPTIONS.PRIMARY) => ({
  padding: '6px 4px',
  border: `1px solid ${ITEM_COLORS[TYPES.TODO][color].BORDER}`,
  borderRadius: '4px',
  width: `${WIDTHS[TYPES.TODO].CONTAINER}px`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline'
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
  background: getBackground(
    ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE.START,
    ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE.STOP
  ),
  boxShadow: '0 1px 1px #DDD',
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-out`,

  '&:hover': {
    background: getBackground(
      ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE_HOVER.START,
      ITEM_COLORS[TYPES.TODO][color].BACKGROUND_COMPLETE_HOVER.STOP
    ),
    boxShadow: '0 1px 1px #CCC',
    transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`
  }
});

const defaultBackdrop = (color = COLOR_OPTIONS.PRIMARY) => ({
  background: getBackground(
    ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT.START,
    ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT.STOP
  ),
  boxShadow: '0 1px 1px #DDD',
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-out`,

  '&:hover': {
    background: getBackground(
      ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT_HOVER.START,
      ITEM_COLORS[TYPES.TODO][color].BACKGROUND_DEFAULT_HOVER.STOP
    ),
    boxShadow: '0 1px 1px #CCC',
    transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`
  }
});

const dateTime = {
  paddingLeft: '38px',
  marginBottom: '-10px !important', // KLUDGE: Help make timestamp height consistent

  '& svg': {
    fontSize: 'small',
    verticalAlign: 'text-top',
    marginRight: '5px'
  }
};

const dateTimeText = {
  opacity: '0.8'
};

const dateTimePrimaryText = {
  opacity: '0.6'
};

export {
  todos,
  items,
  todoContainer,
  item,
  completeBackdrop,
  defaultBackdrop,
  dateTime,
  dateTimeText,
  dateTimePrimaryText
};
