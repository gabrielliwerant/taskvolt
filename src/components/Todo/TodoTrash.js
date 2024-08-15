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

import { IconButton } from '@components/lib/IconButton';
import { Checkbox } from '@components/lib/Checkbox';
import { Typography } from '@components/lib/Typography';
import { NameContainer } from '@components/Name';

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
  getTodoListIdFromTodo,
  getTodoFinalTextFromTodo,
  getTodoIsEditActiveFromTodo,
  getTodoIsCompleteFromTodo
} from '@redux/selectors/todos';
import { isListRemoved } from '@redux/selectors/lists';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';

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
  itemContainer,
  item: {
    ...item,

    cursor: 'default'
  },
  name: {
    cursor: 'default'
  },
  flex
});

const TodoTrash = ({ todo, expunge, restoreTodo, restoreList }) => {
  const classes = useStyles();

  /**
   * Handle todo item restoration.
   *
   * If the todo item belongs to a list that was also removed, we must also restore the list.
   *
   * @returns {void}
   */
  const onClickRestore = () => {
    const listId = getTodoListIdFromTodo(todo);

    if (isListRemoved(listId)) restoreList(listId);

    restoreTodo(getTodoIdFromTodo(todo));
  };

  return (
    <li className={classes.item}>
      <div
        className={classNames({
          [classes.itemContainer]: true,
          [classes.defaultBackdrop]: !getTodoIsCompleteFromTodo(todo),
          [classes.completeBackdrop]: getTodoIsCompleteFromTodo(todo),
        })}
      >
        <Checkbox isChecked={getTodoIsCompleteFromTodo(todo)} disabled />
        <NameContainer
          textFinal={getTodoFinalTextFromTodo(todo)}
          isEditActive={getTodoIsEditActiveFromTodo(todo)}
          isComplete={getTodoIsCompleteFromTodo(todo)}
          myClassNames={{
            container: classNames({
              [classes.name]: true,
              [classes.complete]: getTodoIsCompleteFromTodo(todo)
            })
          }}
        >
          <Typography>{getTodoFinalTextFromTodo(todo)}</Typography>
        </NameContainer>
        <div className={classes.flex}>
          <IconButton onClick={onClickRestore} ariaLabel='Restore item'>
            <RestoreIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={expunge(getTodoIdFromTodo(todo))} ariaLabel='Delete item'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </div>
      </div>
    </li>
  );
};

TodoTrash.propTypes = {
  todo: PropTypes.object.isRequired,
  expunge: PropTypes.func.isRequired,
  restoreTodo: PropTypes.func.isRequired,
  restoreList: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  expunge: id => () => dispatch(todosSlice.actions.expunge(id)),
  restoreTodo: id => dispatch(todosSlice.actions.restore(id)),
  restoreList: id => dispatch(listsSlice.actions.restore(id))
});

export default connect(null, mapDispatchToProps)(TodoTrash);
