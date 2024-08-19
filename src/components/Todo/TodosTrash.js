/**
 * src/components/Todo/TodosTrash.js
 *
 * Renders a set of todo removed items.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { TodoTrash } from '@components/Todo';

import { todos } from '@components/Todo/styles';

import { TYPES } from '@src/constants';
import { getIndexFromId } from '@src/utils';
import { getRemovedTodoItemsByListId, getTodoIdFromTodo } from '@redux/selectors/todos';
import { getListsSort } from '@redux/selectors/lists';

const useStyles = createUseStyles({
  todos
});

const TodosTrash = ({ listId, todosItems }) => {
  const classes = useStyles();

  return (
    <ul className={classes.todos}>
      {todosItems.map(todo =>
        <TodoTrash key={getTodoIdFromTodo(todo)} id={getTodoIdFromTodo(todo)} todo={todo} />
      )}
    </ul>
  );
};

TodosTrash.propTypes = {
  listId: PropTypes.string.isRequired,
  todosItems: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  todosItems: getRemovedTodoItemsByListId(ownProps.listId)
});

export default connect(mapStateToProps, null)(TodosTrash);
