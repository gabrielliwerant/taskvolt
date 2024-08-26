/**
 * src/components/List/ListPlaceholder.j
 *
 * Handles styling and display for droppable list placeholders.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { getTodosHeight } from '@components/Todo/utils';
import { listItemContainer } from '@components/List/styles';
import { LIST_PADDING, MARGINS, WIDTHS, Z_INDEX } from '@jss/constants';

import { ITEM_COLORS } from '@src/theme';
import { TYPES } from '@src/constants';
import { getTodoItemsByListId } from '@redux/selectors/todos';
import { getListSelected } from '@redux/selectors/lists';

const classNames = require('classnames');

const useStyles = createUseStyles({
  placeholder: {
    position: 'relative',
    width: `${WIDTHS.LIST.MAIN}px`,
    zIndex: Z_INDEX.LIST_PLACEHOLDER,
    left: 0,
    top: 0
  },
  item: {
    border: `1px dashed ${ITEM_COLORS[TYPES.LIST].PLACEHOLDER.BORDER}`,
    borderRadius: '4px',
    background: ITEM_COLORS[TYPES.LIST].PLACEHOLDER.BACKGROUND
  },
  listItemContainer
});

// KLUDGE: Hardcoded sizes for list height
const LIST_TITLE_HEIGHT = 41;
const LIST_PLACEHOLDER_HEIGHT_OFFSET = 13;

/**
 * Retrieve the list height from a given todo height by adding list height-altering constants.
 *
 * @param {integer} height Todos height
 * @returns {integer}
 */
const getListHeight = height =>
  height + LIST_TITLE_HEIGHT + (LIST_PADDING * 3) - MARGINS[TYPES.TODO].MAIN;

const ListPlaceholder = ({ id, projectId, index, selectedId, todoItems }) => {
  const classes = useStyles();
  const [placeholderHeight, setPlaceholderHeight] = useState(getListHeight(getTodosHeight(id)));

  useEffect(() => {
    setPlaceholderHeight(getListHeight(getTodosHeight(id)));
  }, [todoItems]);

  return (
    <li
      className={classNames({ [classes.item]: true, [classes.listItemContainer]: true })}
      style={{ height: `${placeholderHeight}px` }}
    >
      <div className={classes.placeholder} />
    </li>
  );
};

ListPlaceholder.propTypes = {
  id: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  selectedId: PropTypes.string.isRequired,
  todoItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

ListPlaceholder.defaultProps = {
  droppingIndex: null
};

const mapStateToProps = (state, ownProps) => ({
  todoItems: getTodoItemsByListId(ownProps.id),
  selectedId: getListSelected()
});

export default connect(mapStateToProps, null)(ListPlaceholder);
