/**
 * src/components/Todo/TodoPlaceholder.js
 *
 * Handles styling and display for droppable todo placeholders.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { getClassNames } from '@jss/utils';
import { LINES_TO_HEIGHT, BORDER_OFFSET, WIDTHS, Z_INDEX } from '@jss/constants';
import { COLOR_OPTIONS, ITEM_COLORS } from '@src/theme';
import { getTodoHeight } from '@components/Todo/utils';

import { TYPES, MAX_LENGTH_PER_LINE } from '@src/constants';
import {
  getTodoIdBySortIndex,
  getTodoSortIndexById,
  getTodoFinalTextById,
  isTodoEditActiveById,
  getTodoSelected,
  getTodoDropping,
  getTodoItemListIdById,
  getTodoItemColor
} from '@redux/selectors/todos';

/**
 * Retrieve the appropriate height class name for the given text length.
 *
 * @param {string} text
 * @returns {string} Class name
 */
const getClassNameForTextLength = text => {
  if (text.length <= MAX_LENGTH_PER_LINE[TYPES.TODO].TWO) return 'twoLines';
  if (text.length <= MAX_LENGTH_PER_LINE[TYPES.TODO].THREE) return 'threeLines';
  if (text.length <= MAX_LENGTH_PER_LINE[TYPES.TODO].FOUR) return 'fourLines';
  if (text.length <= MAX_LENGTH_PER_LINE[TYPES.TODO].FIVE) return 'fiveLines';
};

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
  editActive: { height: `${LINES_TO_HEIGHT[TYPES.TODO].TWO - BORDER_OFFSET}px` },
  twoLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].TWO - BORDER_OFFSET}px` },
  threeLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].THREE - BORDER_OFFSET}px` },
  fourLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].FOUR - BORDER_OFFSET}px` },
  fiveLines: { height: `${LINES_TO_HEIGHT[TYPES.TODO].FIVE - BORDER_OFFSET}px` }
});

const TodoPlaceholder = ({
  id,
  listId,
  textFinal,
  index,
  isEditActive,
  droppingIndex,
  selectedId,
  color
}) => {
  const classes = useStyles({ color });

  /**
   * Determine if we're dragging but not dropping.
   *
   * @returns {boolean}
   */
  const getIsDraggingButNotDropping = () => selectedId !== '' && droppingIndex === null;

  /**
   * Determine if we're dragging and dropping.
   *
   * @returns {boolean}
   */
  const getIsDraggingAndDropping = () => selectedId && droppingIndex !== null;

  /**
   * Determine if we're not dragging and not dropping.
   *
   * @returns {boolean}
   */
  const getIsNotDraggingNorDropping = () => !selectedId && droppingIndex === null;

  /**
   * Determine if we're dropping to the current index.
   *
   * @returns {boolean}
   */
  const getIsDroppingHere = () => index === droppingIndex;

  /**
   * Determine if we're dragging from the current index.
   *
   * @returns {boolean}
   */
  const getIsDraggingFromHere = () =>
    selectedId ? index === getTodoSortIndexById(selectedId, listId) : false;

  /**
   * Retrieve the listId from the selected todo id.
   *
   * @returns {string|null}
   */
  const getSelectedTodoIdListId = () => selectedId ? getTodoItemListIdById(selectedId) : null;

  const [draggingButNotDropping, setDraggingButNotDropping] = useState(getIsDraggingButNotDropping());
  const [draggingAndDropping, setDraggingAndDropping] = useState(getIsDraggingAndDropping());
  const [notDraggingNorDropping, setNotDraggingNorDropping] = useState(getIsNotDraggingNorDropping());
  const [droppingHere, setDroppingHere] = useState(getIsDroppingHere());
  const [draggingFromHere, setDraggingFromHere] = useState(getIsDraggingFromHere());
  const [selectedTodoIdListId, setSelectedTodoIdListId] = useState(getSelectedTodoIdListId());

  useEffect(() => {
    setDraggingButNotDropping(getIsDraggingButNotDropping());
    setDraggingAndDropping(getIsDraggingAndDropping());
    setNotDraggingNorDropping(getIsNotDraggingNorDropping());
    setDroppingHere(getIsDroppingHere());
    setDraggingFromHere(getIsDraggingFromHere());
  }, [droppingIndex, selectedId]);

  useEffect(() => {
    setSelectedTodoIdListId(getSelectedTodoIdListId());
  }, [selectedId]);

  /**
   * Get the class name for the appropriate size based on the dropping index.
   *
   * @returns {string}
   */
  const getDroppingClassName = () => {
    if (!draggingAndDropping || !droppingHere || !selectedId)
      return getClassNameForTextLength(textFinal);

    if (getTodoHeight(id) === getTodoHeight(selectedId))
      return getClassNameForTextLength(textFinal);

    return getClassNameForTextLength(getTodoFinalTextById(selectedId));
  };

  /**
   * Get the class name for the appropriate size based on the selected index.
   *
   * @returns {string}
   */
  const getSelectedClassName = () => {
    if (!draggingAndDropping || !draggingFromHere || droppingIndex === null)
      return getClassNameForTextLength(textFinal);

    const droppingId = getTodoIdBySortIndex(droppingIndex, listId);

    if (getTodoHeight(droppingId) === getTodoHeight(selectedId))
      return getClassNameForTextLength(textFinal);

    return getClassNameForTextLength(getTodoFinalTextById(droppingId));
  };

  return (
    <li className={classes.item}>
      <div
        className={getClassNames(
          classes.placeholder,
          [
            isEditActive && classes.editActive,
            selectedTodoIdListId && draggingAndDropping && selectedTodoIdListId !== listId
              ? classes[getClassNameForTextLength(textFinal)]
              : '',
            !isEditActive && notDraggingNorDropping || draggingButNotDropping
              ? classes[getClassNameForTextLength(textFinal)]
              : '',
            !isEditActive && draggingAndDropping && !droppingHere && !draggingFromHere
              ? classes[getClassNameForTextLength(textFinal)]
              : '',
            !isEditActive && draggingAndDropping && droppingHere && selectedTodoIdListId === listId
              ? classes[getDroppingClassName()]
              : '',
            !isEditActive && draggingAndDropping && draggingFromHere
              ? classes[getSelectedClassName()]
              : ''
          ]
        )}
      />
    </li>
  );
};

TodoPlaceholder.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  textFinal: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  droppingIndex: PropTypes.number,
  selectedId: PropTypes.string,
  color: PropTypes.PropTypes.oneOf([
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY
  ]).isRequired
};

TodoPlaceholder.defaultProps = {
  droppingIndex: null,
  selectedId: ''
};

const mapStateToProps = (state, ownProps) => ({
  textFinal: getTodoFinalTextById(ownProps.id),
  isEditActive: isTodoEditActiveById(ownProps.id),
  droppingIndex: getTodoDropping(),
  selectedId: getTodoSelected(),
  color: getTodoItemColor(ownProps.id)
});

export default connect(mapStateToProps, null)(TodoPlaceholder);
