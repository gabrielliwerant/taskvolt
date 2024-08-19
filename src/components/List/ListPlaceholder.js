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
import { LIST_PADDING, MARGINS, WIDTHS, Z_INDEX, COLORS } from '@jss/constants';

import { TYPES } from '@src/constants';
import { getTodosSort, getTodoItemsByListId } from '@redux/selectors/todos';
import {
  getListSelected,
  getListDropping,
  getListIdBySortIndex,
  getListSortIndexById
} from '@redux/selectors/lists';

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
    border: `1px dashed ${COLORS[TYPES.LIST].PLACEHOLDER.BORDER}`,
    borderRadius: '4px',
    background: COLORS[TYPES.LIST].PLACEHOLDER.BACKGROUND
  },
  listItemContainer
});

// KLUDGE: Hardcoded sizes for list height
const LIST_TITLE_HEIGHT = 41;
const LIST_PLACEHOLDER_HEIGHT_OFFSET = 13;

const ListPlaceholder = ({
  id,
  projectId,
  index,
  selectedId,
  droppingIndex,
  todosSort,
  todoItems
}) => {
  const classes = useStyles();

  /**
   * Retrieve the index corresponding to the selected list id.
   *
   * @returns {integer}
   */
  const getSelectedIndex = () => getListSortIndexById(selectedId, projectId);

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());
  useEffect(() => setSelectedIndex(getSelectedIndex()), [selectedId]);

  /**
   * Retrieve the list height based on the list id, the todos it contains, and the other elements
   * that add height to the list.
   *
   * @returns {integer}
   */
  const getListHeight = () => {
    const droppingId = getListIdBySortIndex(droppingIndex, projectId);
    const getIsSelectedList = () => droppingIndex !== null && droppingIndex === index;
    const getIsDroppingList = () => droppingIndex !== null && selectedIndex === index;

    let listId = id;
    if (getIsSelectedList() && selectedId) listId = selectedId;
    if (getIsDroppingList() && droppingId) listId = droppingId;

    const todosHeight = getTodosHeight(todosSort[listId]);

    return todosHeight + LIST_TITLE_HEIGHT + (LIST_PADDING * 3) - MARGINS[TYPES.TODO].MAIN;
  };

  const [listHeight, setListHeight] = useState(getListHeight());
  useEffect(() => setListHeight(getListHeight()), [todoItems, droppingIndex]);

  return (
    <li
      className={classNames({ [classes.item]: true, [classes.listItemContainer]: true })}
      style={{ height: `${listHeight}px` }}
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
  todosSort: PropTypes.object.isRequired,
  todoItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  droppingIndex: PropTypes.number
};

ListPlaceholder.defaultProps = {
  droppingIndex: null
};

const mapStateToProps = (state, ownProps) => ({
  todosSort: getTodosSort(),
  todoItems: getTodoItemsByListId(ownProps.id),
  selectedId: getListSelected(),
  droppingIndex: getListDropping()
});

export default connect(mapStateToProps, null)(ListPlaceholder);
