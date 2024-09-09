/**
 * src/components/Todo/TodoPlaceholder.js
 *
 * Handles styling and display for droppable todo placeholders.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { hidden } from '@jss/styles';
import { getClassNames } from '@jss/utils';
import { BORDER_OFFSET, WIDTHS, Z_INDEX } from '@jss/constants';
import { COLOR_OPTIONS, ITEM_COLORS } from '@src/theme';
import { getTodoHeight } from '@components/Todo/utils';

import { TYPES } from '@src/constants';
import {
  getTodoFinalTextById,
  isTodoEditActiveById,
  isTodoCompleteById,
  getTodoItemColor,
  hasTodoItemDateTimestamp,
  hasTodoItemTimeTimestamp
} from '@redux/selectors/todos';

const classNames = require('classnames');

const useStyles = createUseStyles({
  placeholder: {
    position: 'relative',
    width: `${WIDTHS.TODO.MAIN}px`,
    zIndex: Z_INDEX.TODO_PLACEHOLDER,
    left: 0,
    top: 0
  },
  item: props => ({
    border: `1px dashed ${ITEM_COLORS[TYPES.TODO][props.color].PLACEHOLDER.BORDER}`,
    borderRadius: '4px',
    background: ITEM_COLORS[TYPES.TODO][props.color].PLACEHOLDER.BACKGROUND
  }),
  visible: {
    display: 'list-item'
  },
  hidden
});

const TodoPlaceholder = ({
  id,
  listId,
  textFinal,
  index,
  isEditActive,
  isComplete,
  color,
  hasDateTimestamp,
  hasTimeTimestamp
}) => {
  const classes = useStyles({ color });
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  useEffect(() => {
    setPlaceholderHeight(getTodoHeight(index, listId));
  }, [textFinal, isEditActive, isComplete, hasDateTimestamp, hasTimeTimestamp, color]);

  return (
    <li
      className={classNames({
        [classes.item]: true,
        [classes.hidden]: !placeholderHeight,
        [classes.visible]: placeholderHeight
      })}
      style={{ height: `${placeholderHeight}px` }}
    >
      <div className={classes.placeholder} />
    </li>
  );
};

TodoPlaceholder.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  textFinal: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  color: PropTypes.PropTypes.oneOf([
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY
  ]).isRequired,
  hasDateTimestamp: PropTypes.bool,
  hasTimeTimestamp: PropTypes.bool
};

TodoPlaceholder.defaultProps = {
  hasDateTimestamp: null,
  hasTimeTimestamp: null
};

const mapStateToProps = (state, ownProps) => ({
  textFinal: getTodoFinalTextById(ownProps.id),
  isEditActive: isTodoEditActiveById(ownProps.id),
  isComplete : isTodoCompleteById(ownProps.id),
  color: getTodoItemColor(ownProps.id),
  hasDateTimestamp: hasTodoItemDateTimestamp(ownProps.id),
  hasTimeTimestamp: hasTodoItemTimeTimestamp(ownProps.id)
});

export default connect(mapStateToProps, null)(TodoPlaceholder);
