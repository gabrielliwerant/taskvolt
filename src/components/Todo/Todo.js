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
  itemContainer,
  item,
  completeBackdrop,
  defaultBackdrop
} from '@components/Todo/styles';
import { flex } from '@jss/styles';
import { tilt } from '@jss/utils';

import {
  getTodoIdFromTodo,
  getTodoItemDateTimestampById,
  getTodoFinalTextFromTodo,
  getTodoDraftTextFromTodo,
  getTodoIsEditActiveFromTodo,
  getTodoIsCompleteFromTodo
} from '@redux/selectors/todos';
import { todosSlice } from '@redux/reducers/todos';
import { getTodoSelected } from '@redux/selectors/todos';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete,
  completeBackdrop,
  defaultBackdrop,
  itemContainer,
  item,
  flex
});

const Todo = ({
  provided,
  todo,
  dragId,
  dateTimestamp,
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

  const onComplete = id => e => complete(id, e.target.checked);
  const onChange = id => e => change(id, e.target.value);

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
    setDate(getTodoIdFromTodo(todo), timestamp);
    setIsCalendarOpen(false);
  };

  return (
    <li
      key={getTodoIdFromTodo(todo)}
      className={classes.item}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={classNames({
          [classes.itemContainer]: true,
          [classes.defaultBackdrop]: !getTodoIsCompleteFromTodo(todo),
          [classes.completeBackdrop]: getTodoIsCompleteFromTodo(todo)
        })}
        style={{ transform: dragId === getTodoIdFromTodo(todo) ? tilt : '' }}
      >
        <Checkbox
          onChange={onComplete(getTodoIdFromTodo(todo))}
          isChecked={getTodoIsCompleteFromTodo(todo)}
        />
        <NameContainer
          onClickEdit={edit(getTodoIdFromTodo(todo))}
          onChangeEdit={onChange(getTodoIdFromTodo(todo))}
          onClickSave={save(getTodoIdFromTodo(todo), getTodoDraftTextFromTodo(todo))}
          onClickCancel={cancel(getTodoIdFromTodo(todo))}
          inactiveIconSection={
            <div className={classes.flex}>
              <Tooltip title='Delete todo'>
                <IconButton onClick={remove(getTodoIdFromTodo(todo))} ariaLabel='Delete todo item'>
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
          textFinal={getTodoFinalTextFromTodo(todo)}
          textDraft={getTodoDraftTextFromTodo(todo)}
          isEditActive={getTodoIsEditActiveFromTodo(todo)}
          isComplete={getTodoIsCompleteFromTodo(todo)}
          myClassNames={{
            container: classNames({
              [classes.complete]: getTodoIsCompleteFromTodo(todo)
            })}
          }
        >
          <Typography>{getTodoFinalTextFromTodo(todo)}</Typography>
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
  provided: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
  dragId: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  dragId: getTodoSelected(),
  dateTimestamp: getTodoItemDateTimestampById(getTodoIdFromTodo(ownProps.todo))
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
