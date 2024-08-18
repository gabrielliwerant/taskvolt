/**
 * src/components/Todo/TodoPlaceholder.js
 *
 * Handles styling and display for droppable todo placeholders.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { hidden } from '@jss/styles';
import {
  BORDER_OFFSET,
  LIST_WIDTH_POSITION,
  LIST_PADDING,
  MARGINS,
  HEIGHTS,
  WIDTHS,
  Z_INDEX,
  COLORS
} from '@jss/constants';

import { TYPES } from '@src/constants';
import { getTodosSort } from '@redux/selectors/todos';
import { getListSelected } from '@redux/selectors/lists';

const classNames = require('classnames');

const useStyles = createUseStyles({
  placeholder: {
    position: 'absolute',
    borderRadius: '4px',
    height: `${HEIGHTS.TODO.PLACEHOLDER}px`,
    width: `${WIDTHS.TODO.MAIN}px`,
    zIndex: Z_INDEX.TODO_PLACEHOLDER,
    left: 0,
    top: 0
  },
  item: {
    border: `1px dashed ${COLORS[TYPES.TODO].PLACEHOLDER.BORDER}`,
    background: COLORS[TYPES.TODO].PLACEHOLDER.BACKGROUND
  },
  hidden
});

const Placeholder = ({ id, listIndex, index, dragListId, todosSort }) => {
  const classes = useStyles();

  const marginTop = `${
    MARGINS[TYPES.TODO].PLACEHOLDER
    + ((HEIGHTS.TODO.MAIN + BORDER_OFFSET + MARGINS[TYPES.TODO].MAIN) * index)
  }px`;
  const marginLeft = `${((1 + listIndex) * LIST_WIDTH_POSITION) + LIST_PADDING + BORDER_OFFSET}px`;

  return (
    <div
      key={id}
      style={{ marginTop, marginLeft }}
      className={
        classNames({
          [classes.placeholder]: true,
          [classes.item]: true,
          [classes.hidden]: !!dragListId
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
  todosSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  todosSort: getTodosSort(),
  dragListId: getListSelected()
});

export default connect(mapStateToProps, null)(Placeholder);
