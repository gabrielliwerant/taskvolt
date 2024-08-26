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

import { COLOR_OPTIONS, shouldContrast } from '@src/theme';
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
import { flex, flexCenterY } from '@jss/styles';

import { getDateTimeDisplayText } from '@components/Name/utils';
import {
  isTodoCompleteById,
  isTodoEditActiveById,
  getTodoFinalTextById,
  getTodoListIdFromTodo,
  getTodoItemDateTimestampById,
  getTodoItemTimeTimestampById,
  getTodoItemColor
} from '@redux/selectors/todos';
import { isListRemoved, getListItemProjectId } from '@redux/selectors/lists';
import { isProjectRemoved } from '@redux/selectors/projects';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';
import { projectsSlice } from '@redux/reducers/projects';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete,
  completeBackdrop: props => ({
    ...completeBackdrop(props.color),

    '&:hover': {}
  }),
  defaultBackdrop: props => ({
    ...defaultBackdrop(props.color),

    '&:hover': {}
  }),
  todoContainer: props => todoContainer(props.color),
  item: {
    ...item,

    cursor: 'default'
  },
  name: {
    cursor: 'default'
  },
  dateTime,
  dateTimeText,
  dateTimePrimaryText,
  flexCenterY,
  flex
});

const TodoTrash = ({
  id,
  todo,
  isComplete,
  isEditActive,
  textFinal,
  color,
  expunge,
  restoreTodo,
  restoreList,
  restoreProject
}) => {
  const classes = useStyles({ color });
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
          [classes.defaultBackdrop]: !isComplete,
          [classes.completeBackdrop]: isComplete,
        })}
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
          <Checkbox isChecked={isComplete} disabled />
          <NameContainer
            color={color}
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
                <RestoreIcon fontSize='small' color={shouldContrast(color) ? 'white' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete permanently'>
              <IconButton onClick={expunge} ariaLabel='Delete item'>
                <DeleteIcon fontSize='small' color={shouldContrast(color) ? 'white' : 'inherit'} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </li>
  );
};

TodoTrash.propTypes = {
  id: PropTypes.string.isRequired,
  todo: PropTypes.object.isRequired,
  isComplete: PropTypes.bool.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  textFinal: PropTypes.string.isRequired,
  color: PropTypes.PropTypes.oneOf([
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY
  ]).isRequired,
  expunge: PropTypes.func.isRequired,
  restoreTodo: PropTypes.func.isRequired,
  restoreList: PropTypes.func.isRequired,
  restoreProject: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isComplete : isTodoCompleteById(ownProps.id),
  isEditActive: isTodoEditActiveById(ownProps.id),
  textFinal : getTodoFinalTextById(ownProps.id),
  color: getTodoItemColor(ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  expunge: () => dispatch(todosSlice.actions.expunge(ownProps.id)),
  restoreTodo: () => dispatch(todosSlice.actions.restore(ownProps.id)),
  restoreList: id => dispatch(listsSlice.actions.restore(id)),
  restoreProject: id => dispatch(projectsSlice.actions.restore(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTrash);
