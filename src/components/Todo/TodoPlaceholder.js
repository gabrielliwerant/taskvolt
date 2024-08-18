/**
 * src/components/Todo/TodoPlaceholder.js
 *
 * Handles styling and display for droppable todo placeholders.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { LINES_TO_HEIGHT, WIDTHS, Z_INDEX, COLORS } from '@jss/constants';

import { TYPES, MAX_LENGTH_PER_LINE } from '@src/constants';
import { getTodoFinalTextById } from '@redux/selectors/todos';

const classNames = require('classnames');

/**
 * Retrieve the appropriate height class name for the given text length.
 *
 * @param {integer} len Length of text
 * @returns {string} Class name
 */
const getClassNameForTextLength = len => {
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].TWO) return 'twoLines';
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].THREE) return 'threeLines';
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].FOUR) return 'fourLines';
  if (len <= MAX_LENGTH_PER_LINE[TYPES.TODO].FIVE) return 'fiveLines';
};

const useStyles = createUseStyles({
  placeholder: {
    position: 'relative',
    width: `${WIDTHS.TODO.MAIN}px`,
    zIndex: Z_INDEX.TODO_PLACEHOLDER,
    left: 0,
    top: 0
  },
  item: {
    border: `1px dashed ${COLORS[TYPES.TODO].PLACEHOLDER.BORDER}`,
    borderRadius: '4px',
    background: COLORS[TYPES.TODO].PLACEHOLDER.BACKGROUND
  },
  twoLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].TWO - 2}px` },
  threeLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].THREE - 2}px` },
  fourLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].FOUR - 2}px` },
  fiveLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].FIVE - 2}px` }
});

const TodoPlaceholder = ({ id, textFinal }) => {
  const classes = useStyles();

  return (
    <li className={classes.item}>
      <div
        className={
          classNames({
            [classes.placeholder]: true,
            [classes[getClassNameForTextLength(textFinal.length)]]: true
          })
        }
      />
    </li>
  );
};

TodoPlaceholder.propTypes = {
  id: PropTypes.string.isRequired,
  textFinal: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  textFinal : getTodoFinalTextById(ownProps.id)
});

export default connect(mapStateToProps, null)(TodoPlaceholder);
