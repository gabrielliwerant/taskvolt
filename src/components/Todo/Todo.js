/**
 * src/components/Todo/Todo.js
 *
 * Renders a todo item with associated functionality.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { motion  } from 'framer-motion';

import AlarmIcon from '@mui/icons-material/AlarmRounded';

import { Checkbox } from '@components/lib/Checkbox';
import { Typography } from '@components/lib/Typography';
import { Tooltip } from '@components/lib/Tooltip';
import { NameContainer } from '@components/Name';
import { TodoActions } from '@components/Todo';
import DateCalendarModal from '@components/DateCalendarModal';
import TimeClockModal from '@components/TimeClockModal';

import { complete } from '@components/styles';
import {
  todoContainer,
  item,
  completeBackdrop,
  defaultBackdrop,
  dateTimeEditInactive,
  dateTime,
  dateTimeText,
  dateTimePrimaryText
} from '@components/Todo/styles';
import { tilt, straighten, flexCenterY, fullWidth } from '@jss/styles';
import { ANIMATION_TIMES } from '@jss/constants';
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
  completing: {
    animation: 'rubberBand',
    animationDuration: `${ANIMATION_TIMES.LONG}ms`
  },
  complete,
  completeBackdrop: props => completeBackdrop(props.color),
  defaultBackdrop: props => defaultBackdrop(props.color),
  todoContainer: props => todoContainer(props.color),
  dateTimeEditInactive,
  dateTime,
  dateTimeText,
  dateTimePrimaryText,
  item,
  flexCenterY,
  fullWidth
});

const Todo = ({
  id,
  provided,
  todo,
  dragId,
  dateTimestamp = null,
  timeTimestamp = null,
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
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (isComplete && !dragId) return;

    setIsCompleting(false);
  }, [isComplete, dragId])

  /**
   * Handle completed checkbox toggle.
   *
   * @param {object} e Event object
   * @returns {void}
   */
  const onComplete = e => {
    complete(id, e.target.checked);

    if (isComplete) return;

    setIsCompleting(true);
  };

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
   * Handles the click to edit behavior for the todo item.
   *
   * @param {object} e Event
   * @returns {void}
   */
  const onClickEdit = e => {
    // Always allow edit if not clicking an anchor tag
    if (e.target.parentElement.tagName !== 'A') return edit(id);
    // If we are clicking an anchor and the item is not complete, allow link
    if (!isComplete) return;

    // Prevent link behavior and allow click to edit when item is marked as complete
    e.preventDefault();
    edit(id)
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

  /**
   * Set the tooltip and aria title/label for our date/time reminder.
   *
   * @returns {string}
   */
  const getReminderTitle = () => {
    const dateReminder = hasDateReminder ? 'Date' : '';
    const timeReminder = hasTimeReminder ? 'Time' : '';
    const conjunction = hasDateReminder && hasTimeReminder ? ' and ' : '';

    return `${dateReminder}${conjunction}${timeReminder} reminder set`;
  };

  return (
    <li
      className={classNames({ [classes.item]: true, [classes.completing]: isCompleting })}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <motion.div
        className={classNames({
          [classes.todoContainer]: true,
          [classes.flexCenterY]: true,
          [classes.defaultBackdrop]: !isComplete,
          [classes.completeBackdrop]: isComplete
        })}
        animate={{ transform: dragId === id ? tilt : straighten }}
      >
        {(!!dateTimestamp || !!timeTimestamp) &&
          <Typography
            variant='caption'
            color={color}
            component='div'
            className={classNames({
              [classes.dateTime]: true,
              [classes.dateTimeEditInactive]: !isEditActive,
              [classes.dateTimeText]: color !== COLOR_OPTIONS.PRIMARY,
              [classes.dateTimePrimaryText]: color === COLOR_OPTIONS.PRIMARY
            })}
          >
            {(hasDateReminder || hasTimeReminder) &&
              <Tooltip title={getReminderTitle()}>
                <span><AlarmIcon fontSize='small' /></span>
              </Tooltip>
            }
            {getDateTimeDisplayText(dateTimestamp, timeTimestamp)}
          </Typography>
        }
        <div className={classNames({ [classes.fullWidth]: true, [classes.flexCenterY]: true })}>
          <Checkbox onChange={onComplete} isChecked={isComplete} color={color} />
          <NameContainer
            id={id}
            color={color}
            onClickEdit={onClickEdit}
            onChangeEdit={onChange}
            onClickSave={save(id, textDraft)}
            onClickCancel={cancel(id)}
            inactiveIconSection={
              <TodoActions id={id} onCalendarClick={onCalendarClick} onClockClick={onClockClick} />
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
      </motion.div>
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
  edit: id => dispatch(todosSlice.actions.edit(id)),
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
