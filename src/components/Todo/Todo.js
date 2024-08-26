/**
 * src/components/Todo/Todo.js
 *
 * Renders a todo item with associated functionality.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { Checkbox } from '@components/lib/Checkbox';
import { Typography } from '@components/lib/Typography';
import { NameContainer } from '@components/Name';
import { TodoActions } from '@components/Todo';
import DateCalendarModal from '@components/DateCalendarModal';
import TimeClockModal from '@components/TimeClockModal';

import {
  complete,
  todoContainer,
  item,
  completeBackdrop,
  defaultBackdrop,
  dateTime,
  dateTimeText,
  dateTimePrimaryText
} from '@components/Todo/styles';
import { tilt, flexCenterY } from '@jss/styles';
import { COLOR_OPTIONS, ITEM_COLORS } from '@src/theme';

import { getDateTimeDisplayText } from '@components/Name/utils';
import { TYPES, MAX_LENGTH_INPUT } from '@src/constants';
import {
  isTodoCompleteById,
  getTodoDraftTextById,
  getTodoFinalTextById,
  isTodoEditActiveById,
  getTodoItemDateTimestampById,
  getTodoItemTimeTimestampById,
  hasTodoDateReminder,
  hasTodoTimeReminder,
  getTodoItemColor
} from '@redux/selectors/todos';
import { todosSlice } from '@redux/reducers/todos';
import { getTodoSelected } from '@redux/selectors/todos';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete,
  completeBackdrop: props => completeBackdrop(props.color),
  defaultBackdrop: props => defaultBackdrop(props.color),
  todoContainer: props => ({
    ...todoContainer(props.color),

    '& label': {
      marginLeft: '-2px'
    },
    '&:hover label': {
      marginLeft: '-2px'
    }
  }),
  dateTime,
  dateTimeText,
  dateTimePrimaryText,
  item,
  flexCenterY
});

const Todo = ({
  id,
  provided,
  todo,
  dragId,
  dateTimestamp,
  timeTimestamp,
  isComplete,
  textDraft,
  textFinal,
  isEditActive,
  hasDateReminder,
  hasTimeReminder,
  color,
  edit,
  save,
  cancel,
  setDate,
  setTime,
  change,
  complete,
  setDateReminder,
  setTimeReminder
}) => {
  const classes = useStyles({ color });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);

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

  /**
   * Handle date clock click action from menu.
   *
   * @returns {void}
   */
  const onClockClick = () => setIsClockOpen(true);

  /**
   * Handle time clock dialog close action.
   *
   * @returns {void}
   */
  const onClockCloseClick = () => setIsClockOpen(false);

  /**
   * Handle time close dialog confirm action.
   *
   * @param {integer} timestamp
   * @returns {void}
   */
  const onClockConfirm = timestamp => {
    setTime(id, timestamp);
    setIsClockOpen(false);
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
          [classes.flexCenterY]: true,
          [classes.defaultBackdrop]: !isComplete,
          [classes.completeBackdrop]: isComplete
        })}
        style={{ transform: dragId === id ? tilt : '' }}
      >
        {(!!dateTimestamp || !!timeTimestamp) && !isEditActive &&
          <Typography
            variant='caption'
            color={color}
            component='div'
            className={classNames({
              [classes.dateTime]: true,
              [classes.dateTimeText]: color !== COLOR_OPTIONS.PRIMARY,
              [classes.dateTimePrimaryText]: color === COLOR_OPTIONS.PRIMARY
            })}
          >
            {getDateTimeDisplayText(dateTimestamp, timeTimestamp)}
          </Typography>
        }
        <div className={classes.flexCenterY}>
          <Checkbox onChange={onComplete} isChecked={isComplete} color={color} />
          <NameContainer
            id={id}
            color={color}
            onClickEdit={edit(id)}
            onChangeEdit={onChange}
            onClickSave={save(id, textDraft)}
            onClickCancel={cancel(id)}
            inactiveIconSection={
              <TodoActions
                id={id}
                onCalendarClick={onCalendarClick}
                onClockClick={onClockClick}
                hasDateReminder={hasDateReminder}
                hasTimeReminder={hasTimeReminder}
              />
            }
            dateTimestamp={dateTimestamp}
            timeTimestamp={timeTimestamp}
            textFinal={textFinal}
            textDraft={textDraft}
            isEditActive={isEditActive}
            isComplete={isComplete}
            myClassNames={{ container: classNames({ [classes.complete]: isComplete })}}
          >
            <Typography>{textFinal}</Typography>
          </NameContainer>
        </div>
      </div>
      <DateCalendarModal
        isOpen={isCalendarOpen}
        onConfirm={onCalendarConfirm}
        onClose={onCalendarCloseClick}
        hasReminder={hasDateReminder}
        onReminderChange={setDateReminder(id)}
        value={dateTimestamp}
      />
      <TimeClockModal
        isOpen={isClockOpen}
        onConfirm={onClockConfirm}
        onClose={onClockCloseClick}
        hasReminder={hasTimeReminder}
        onReminderChange={setTimeReminder(id)}
        value={timeTimestamp}
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
  timeTimestamp: PropTypes.number,
  isComplete: PropTypes.bool.isRequired,
  textDraft: PropTypes.string.isRequired,
  textFinal: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  hasDateReminder: PropTypes.bool.isRequired,
  hasTimeReminder: PropTypes.bool.isRequired,
  color: PropTypes.PropTypes.oneOf([
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY
  ]).isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired,
  setDateReminder: PropTypes.func.isRequired,
  setTimeReminder: PropTypes.func.isRequired
};

Todo.defaultProps = {
  dateTimestamp: null,
  timeTimestamp: null
};

const mapStateToProps = (state, ownProps) => ({
  dragId: getTodoSelected(),
  dateTimestamp: getTodoItemDateTimestampById(ownProps.id),
  timeTimestamp: getTodoItemTimeTimestampById(ownProps.id),
  isComplete : isTodoCompleteById(ownProps.id),
  textDraft : getTodoDraftTextById(ownProps.id),
  textFinal : getTodoFinalTextById(ownProps.id),
  isEditActive: isTodoEditActiveById(ownProps.id),
  hasDateReminder: hasTodoDateReminder(ownProps.id),
  hasTimeReminder: hasTodoTimeReminder(ownProps.id),
  color: getTodoItemColor(ownProps.id)
});

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(todosSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(todosSlice.actions.save({ id, draft })),
  cancel: id => () => dispatch(todosSlice.actions.cancel(id)),
  setDate: (id, timestamp) => dispatch(todosSlice.actions.setDateTimestamp({ id, timestamp })),
  setTime: (id, timestamp) => dispatch(todosSlice.actions.setTimeTimestamp({ id, timestamp })),
  change: (id, draft) => dispatch(todosSlice.actions.change({ id, draft })),
  complete: (id, checked) => dispatch(todosSlice.actions.complete({ id, checked })),
  setDateReminder: id => hasReminder =>
    dispatch(todosSlice.actions.setDateReminder({ id, hasReminder })),
  setTimeReminder: id => hasReminder =>
    dispatch(todosSlice.actions.setTimeReminder({ id, hasReminder }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
