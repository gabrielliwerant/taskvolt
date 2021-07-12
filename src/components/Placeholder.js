/**
 * Placeholder
 *
 * Handles styling and display for droppable list placeholders.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import {
  BORDER_OFFSET,
  TODO_HEIGHT,
  TODO_WIDTH,
  TODO_MARGIN,
  TODO_POSITION,
  LIST_POSITION
} from '../jss/constants';

const useStyles = createUseStyles({
  placeholder: {
    position: 'absolute',
    width: `${TODO_WIDTH}px`,
    height: `${TODO_HEIGHT}px`,
    marginTop: `${TODO_POSITION}px`,
    borderRadius: '4px',
    zIndex: 0,
    border: '1px dashed #aaaaaa',
    background: '#dddddd',
    left: '47px'
  }
});

const Placeholder = ({ todoId, listIndex, index }) => {
  const classes = useStyles();
  const marginTop =
    `${TODO_POSITION + (TODO_HEIGHT + BORDER_OFFSET + TODO_MARGIN) * index}px`;
  const marginLeft = `${listIndex * LIST_POSITION}px`;

  return (
    <div
      key={todoId}
      style={{ marginTop, marginLeft }}
      className={classes.placeholder}
    />
  );
};

Placeholder.propTypes = {
  todoId: PropTypes.string.isRequired,
  listIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default Placeholder;
