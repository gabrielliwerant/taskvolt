/**
 * Placeholder
 *
 * Handles styling and display for droppable list placeholders.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import {
  TOP_OFFSET,
  BORDER_OFFSET,
  TODO_MARGIN,
  TODO_HEIGHT,
  TODO_WIDTH,
  TODO_HEIGHT_POSITION,
  LIST_WIDTH_POSITION,
  LIST_WIDTH,
  LIST_PADDING,
  ZINDEX
} from '../jss/constants';
import {
  getTodosItemsSort,
  getListSelected,
  getListDropping
} from '../selectors';

const classNames = require('classnames');

const LIST_PLACEHOLDER_HEIGHT_OFFSET = 13;

const useStyles = createUseStyles({
  placeholder: {
    position: 'absolute',
    borderRadius: '4px',
    border: '1px dashed #aaaaaa',
    background: '#dddddd',
    left: 0,
    top: 0
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
    `${(TODO_HEIGHT + BORDER_OFFSET + TODO_MARGIN) * todosSort[id].length + TODO_HEIGHT_POSITION + LIST_PLACEHOLDER_HEIGHT_OFFSET}px`;

  let marginTop;
  let marginLeft;
  let height;
  let width;
  let zIndex;

  switch (variant) {
    case 'item':
      marginTop =
        `${TODO_HEIGHT_POSITION + ((TODO_HEIGHT + BORDER_OFFSET + TODO_MARGIN) * index)}px`;
      marginLeft =
        `${((1 + listIndex) * LIST_WIDTH_POSITION) + LIST_PADDING + BORDER_OFFSET}px`;
      height = `${TODO_HEIGHT}px`;
      width = `${TODO_WIDTH}px`;
      zIndex = ZINDEX.itemPlaceholder;
      break;
    case 'list':
      marginTop = `${TOP_OFFSET}px`;
      marginLeft = `${LIST_PADDING * 2 + (LIST_WIDTH_POSITION * listIndex)}px`;
      height = !!dragListId ? getListHeight(dragListId) : getListHeight(id);
      width = `${LIST_WIDTH}px`;
      zIndex = ZINDEX.listPlaceholder;
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
  todosSort: getTodosItemsSort(),
  dragListId: getListSelected(),
  dropListIndex: getListDropping()
});

export default connect(mapStateToProps, null)(Placeholder);
