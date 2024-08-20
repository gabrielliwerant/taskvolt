/**
 * src/components/Todo/TodoTrash.js
 *
 * Renders a removed todo item.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import RestoreIcon from '@mui/icons-material/RestoreRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import { Checkbox } from '@components/lib/Checkbox';
import { Typography } from '@components/lib/Typography';
import { NameContainer } from '@components/Name';

import {
  complete,
  todoContainer,
  todoContainerPaddingWithDatetime,
  todoContainerPaddingWithoutDatetime,
  item,
  completeBackdrop,
  defaultBackdrop
} from '@components/Todo/styles';
import { flex, flexCenterY } from '@jss/styles';

import {
  isTodoCompleteById,
  getTodoFinalTextById,
  getTodoListIdFromTodo,
  getTodoItemDateTimestampById,
  getTodoItemTimeTimestampById
} from '@redux/selectors/todos';
import { isListRemoved, getListItemProjectId } from '@redux/selectors/lists';
import { isProjectRemoved } from '@redux/selectors/projects';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';
import { projectsSlice } from '@redux/reducers/projects';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete,
  completeBackdrop: {
    ...completeBackdrop,

    '&:hover': {}
  },
  defaultBackdrop: {
    ...defaultBackdrop,

    '&:hover': {}
  },
  todoContainer,
  todoContainerPaddingWithDatetime,
  todoContainerPaddingWithoutDatetime,
  item: {
    ...item,

    cursor: 'default'
  },
  name: {
    cursor: 'default'
  },
  flexCenterY,
  flex
});

const TodoTrash = ({
  id,
  todo,
  isComplete,
  textFinal,
  expunge,
  restoreTodo,
  restoreList,
  restoreProject
}) => {
  const classes = useStyles();
  const dateTimestamp = getTodoItemDateTimestampById(id);
  const timeTimestamp = getTodoItemTimeTimestampById(id);

  /**
   * Handle todo item restoration.
   *
   * If the todo item belongs to a list that was also removed, we must also restore the list.
   *
   * @returns {void}
   */
  const onClickRestore = () => {
    const listId = getTodoListIdFromTodo(todo);
    const projectId = getListItemProjectId(listId);

    if (isProjectRemoved(projectId)) restoreProject(projectId);
    if (isListRemoved(listId)) restoreList(listId);

    restoreTodo();
  };

  return (
    <li className={classes.item}>
      <div
        className={classNames({
          [classes.todoContainer]: true,
          [classes.flexCenterY]: true,
          [classes.todoContainerPaddingWithDatetime]: !!dateTimestamp,
          [classes.todoContainerPaddingWithoutDatetime]: !dateTimestamp,
          [classes.defaultBackdrop]: !isComplete,
          [classes.completeBackdrop]: isComplete,
        })}
      >
        <Checkbox isChecked={isComplete} disabled />
        <NameContainer
          textFinal={textFinal}
          isEditActive={false}
          isComplete={isComplete}
          dateTimestamp={dateTimestamp}
          timeTimestamp={timeTimestamp}
          myClassNames={{
            container: classNames({
              [classes.name]: true,
              [classes.complete]: isComplete
            })
          }}
        >
          <Typography>{textFinal}</Typography>
        </NameContainer>
        <div className={classes.flex}>
          <Tooltip title='Restore todo'>
            <IconButton onClick={onClickRestore} ariaLabel='Restore todo item'>
              <RestoreIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete permanently'>
            <IconButton onClick={expunge} ariaLabel='Delete item'>
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </li>
  );
};

TodoTrash.propTypes = {
  id: PropTypes.string.isRequired,
  todo: PropTypes.object.isRequired,
  isComplete: PropTypes.bool.isRequired,
  textFinal: PropTypes.string.isRequired,
  expunge: PropTypes.func.isRequired,
  restoreTodo: PropTypes.func.isRequired,
  restoreList: PropTypes.func.isRequired,
  restoreProject: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isComplete : isTodoCompleteById(ownProps.id),
  textFinal : getTodoFinalTextById(ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  expunge: () => dispatch(todosSlice.actions.expunge(ownProps.id)),
  restoreTodo: () => dispatch(todosSlice.actions.restore(ownProps.id)),
  restoreList: id => dispatch(listsSlice.actions.restore(id)),
  restoreProject: id => dispatch(projectsSlice.actions.restore(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTrash);
