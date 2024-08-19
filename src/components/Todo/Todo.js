/**
 * src/components/Todo/Todo.js
 *
 * Renders a todo item with associated functionality.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import DeleteIcon from '@mui/icons-material/DeleteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVertRounded';
import EventIcon from '@mui/icons-material/EventRounded';

import { MenuList, MenuItem } from '@components/lib/Menu';
import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import { Checkbox } from '@components/lib/Checkbox';
import { Typography } from '@components/lib/Typography';
import { DateCalendar } from '@components/lib/DateCalendar';
import { NameContainer } from '@components/Name';
import MenuSection from '@components/MenuSection';

import {
  complete,
  todoContainer,
  todoContainerPaddingWithDatetime,
  todoContainerPaddingWithoutDatetime,
  item,
  completeBackdrop,
  defaultBackdrop
} from '@components/Todo/styles';
import { tilt, flexCenterY } from '@jss/styles';
import { WIDTHS, COLORS } from '@jss/constants';

import { TYPES, MAX_LENGTH_INPUT } from '@src/constants';
import {
  isTodoCompleteById,
  getTodoDraftTextById,
  getTodoFinalTextById,
  isTodoEditActiveById,
  getTodoItemDateTimestampById
} from '@redux/selectors/todos';
import { todosSlice } from '@redux/reducers/todos';
import { getTodoSelected } from '@redux/selectors/todos';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete,
  completeBackdrop,
  defaultBackdrop,
  todoContainer: {
    ...todoContainer,

    '& label': {
      marginLeft: '-2px',
      minWidth: WIDTHS[TYPES.TODO].LABEL,
      background: `linear-gradient(180deg,
        ${COLORS[TYPES.TODO].BACKGROUND_LABEL.START},
        ${COLORS[TYPES.TODO].BACKGROUND_LABEL.STOP})`
    },
    '&:hover label': {
      marginLeft: '-2px',
      minWidth: WIDTHS[TYPES.TODO].LABEL,
      background: `linear-gradient(180deg,
        ${COLORS[TYPES.TODO].BACKGROUND_LABEL_HOVER.START},
        ${COLORS[TYPES.TODO].BACKGROUND_LABEL_HOVER.STOP})`
    }
  },
  todoContainerPaddingWithDatetime,
  todoContainerPaddingWithoutDatetime,
  item,
  flexCenterY
});

const Todo = ({
  id,
  provided,
  todo,
  dragId,
  dateTimestamp,
  isComplete,
  textDraft,
  textFinal,
  isEditActive,
  edit,
  save,
  cancel,
  setDate,
  remove,
  change,
  complete
}) => {
  const classes = useStyles();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const onComplete = e => complete(id, e.target.checked);

  /**
   * Handles the input field change for text name updates.
   *
   * @param {object} e Event
   * @returns {void}
   */
  const onChange = e => {
    // Prevent entering characters past our limit
    if (e.target.value.length > MAX_LENGTH_INPUT[TYPES.TODO]) return;

    change(id, e.target.value);
  };

  /**
   * Handle date calendar click action from menu.
   *
   * @returns {void}
   */
  const onCalendarClick = () => setIsCalendarOpen(true);

  /**
   * Handle date calendar dialog close action.
   *
   * @returns {void}
   */
  const onCalendarCloseClick = () => setIsCalendarOpen(false);

  /**
   * Handle date calendar dialog confirm action.
   *
   * @param {integer} timestamp
   * @returns {void}
   */
  const onCalendarConfirm = timestamp => {
    setDate(id, timestamp);
    setIsCalendarOpen(false);
  };

  return (
    <li
      className={classes.item}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={classNames({
          [classes.todoContainer]: true,
          [classes.todoContainerPaddingWithDatetime]: !!dateTimestamp,
          [classes.todoContainerPaddingWithoutDatetime]: !dateTimestamp,
          [classes.defaultBackdrop]: !isComplete,
          [classes.completeBackdrop]: isComplete
        })}
        style={{ transform: dragId === id ? tilt : '' }}
      >
        <Checkbox onChange={onComplete} isChecked={isComplete} />
        <NameContainer
          onClickEdit={edit(id)}
          onChangeEdit={onChange}
          onClickSave={save(id, textDraft)}
          onClickCancel={cancel(id)}
          inactiveIconSection={
            <div className={classes.flexCenterY}>
              <Tooltip title='Delete todo'>
                <IconButton onClick={remove(id)} ariaLabel='Delete todo item'>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <MenuSection
                icon={<MoreVertIcon fontSize='small' />}
                ariaLabel='Additional Actions Menu'
              >
                <MenuList>
                  <MenuItem onClick={onCalendarClick} icon={<EventIcon />}>Add Date</MenuItem>
                </MenuList>
              </MenuSection>
            </div>
          }
          dateTimestamp={dateTimestamp}
          textFinal={textFinal}
          textDraft={textDraft}
          isEditActive={isEditActive}
          isComplete={isComplete}
          myClassNames={{ container: classNames({ [classes.complete]: isComplete })}}
        >
          <Typography>{textFinal}</Typography>
        </NameContainer>
      </div>
      <DateCalendar
        isOpen={isCalendarOpen}
        onConfirm={onCalendarConfirm}
        onClose={onCalendarCloseClick}
        value={dateTimestamp}
      />
    </li>
  );
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  provided: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
  dragId: PropTypes.string.isRequired,
  dateTimestamp: PropTypes.number,
  isComplete: PropTypes.bool.isRequired,
  textDraft: PropTypes.string.isRequired,
  textFinal: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired
};

Todo.defaultProps = {
  dateTimestamp: null
};

const mapStateToProps = (state, ownProps) => ({
  dragId: getTodoSelected(),
  dateTimestamp: getTodoItemDateTimestampById(ownProps.id),
  isComplete : isTodoCompleteById(ownProps.id),
  textDraft : getTodoDraftTextById(ownProps.id),
  textFinal : getTodoFinalTextById(ownProps.id),
  isEditActive: isTodoEditActiveById(ownProps.id)
});

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(todosSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(todosSlice.actions.save({ id, draft })),
  cancel: id => () => dispatch(todosSlice.actions.cancel(id)),
  setDate: (id, timestamp) => dispatch(todosSlice.actions.setDateTimestamp({ id, timestamp })),
  remove: id => () => dispatch(todosSlice.actions.remove(id)),
  change: (id, draft) => dispatch(todosSlice.actions.change({ id, draft })),
  complete: (id, checked) => dispatch(todosSlice.actions.complete({ id, checked }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
