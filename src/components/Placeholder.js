/**
 * Placeholder
 *
 * Handles styling and display for droppable list placeholders.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { TYPES } from '@src/constants';
import { getTodosSort } from '@redux/selectors/todos';
import { getListSelected, getListDropping } from '@redux/selectors/lists';

import {
  TOP_OFFSET,
  BORDER_OFFSET,
  LIST_WIDTH_POSITION,
  LIST_PADDING,
  MARGINS,
  HEIGHTS,
  WIDTHS,
  Z_INDEX
} from '@jss/constants';

const classNames = require('classnames');

const LIST_PLACEHOLDER_HEIGHT_OFFSET = 13;

const useStyles = createUseStyles({
  placeholder: {
    position: 'absolute',
    borderRadius: '4px',
    left: 0,
    top: 0
  },
  item: {
    border: '1px dashed #aaaaaa',
    background: '#dddddd'
  },
  list: {
    border: '1px dashed #cccccc',
    background: '#efefef'
  },
  hidden: {
    display: 'none'
  }
});

const Placeholder = ({
  id,
  listIndex,
  index,
  dragListId,
  variant,
  dropListIndex,
  todosSort
}) => {
  const classes = useStyles();
  const getListHeight = id =>
    `${
      (HEIGHTS.TODO.MAIN + BORDER_OFFSET + MARGINS[TYPES.TODO].MAIN) * todosSort[id].length
      + MARGINS[TYPES.TODO].PLACEHOLDER
      + LIST_PLACEHOLDER_HEIGHT_OFFSET - MARGINS[TYPES.TODO].MAIN
    }px`;

  let marginTop;
  let marginLeft;
  let height;
  let width;
  let zIndex;

  switch (variant) {
    case 'item':
      marginTop = `${
        MARGINS[TYPES.TODO].PLACEHOLDER
        + ((HEIGHTS.TODO.MAIN + BORDER_OFFSET + MARGINS[TYPES.TODO].MAIN) * index)
      }px`;
      marginLeft =
        `${((1 + listIndex) * LIST_WIDTH_POSITION) + LIST_PADDING + BORDER_OFFSET}px`;
      height = `${HEIGHTS.TODO.PLACEHOLDER}px`;
      width = `${WIDTHS.TODO.MAIN}px`;
      zIndex = Z_INDEX.TODO_PLACEHOLDER;
      break;
    case 'list':
      marginTop = `${TOP_OFFSET}px`;
      marginLeft = `${LIST_PADDING * 2 + (LIST_WIDTH_POSITION * listIndex)}px`;
      height = !!dragListId ? getListHeight(dragListId) : getListHeight(id);
      width = `${WIDTHS.LIST.MAIN}px`;
      zIndex = Z_INDEX.LIST_PLACEHOLDER;
      break;
  }

  // Hide if it's an 'item' placeholder and we are dragging the whole list
  const isItemPlaceholderHidden = variant === 'item' && !!dragListId;
  // Hide if the list index is not the one we are dragging/dropping
  const isListPlaceholderHidden = variant === 'list' && dropListIndex !== listIndex;

  return (
    <div
      key={id}
      style={{ marginTop, marginLeft, height, width, zIndex }}
      className={
        classNames({
          [classes.placeholder]: true,
          [classes[variant]]: true,
          [classes.hidden]: isItemPlaceholderHidden || isListPlaceholderHidden
        })
      }
    />
  );
};

Placeholder.propTypes = {
  id: PropTypes.string.isRequired,
  listIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  dragListId: PropTypes.string.isRequired,
  todosSort: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['item', 'list']),
  dropListIndex: PropTypes.number
};

Placeholder.defaultProps = {
  variant: 'item',
  dropListIndex: null
};

const mapStateToProps = () => ({
  todosSort: getTodosSort(),
  dragListId: getListSelected(),
  dropListIndex: getListDropping()
});

export default connect(mapStateToProps, null)(Placeholder);
