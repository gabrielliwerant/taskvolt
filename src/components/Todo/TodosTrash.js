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

import { todos, items } from '@components/Todo/styles';

import { TYPES } from '@src/constants';
import { getIndexFromId } from '@src/utils';
import { getRemovedTodoItemsByListId, getTodoIdFromTodo } from '@redux/selectors/todos';
import { getListsSort } from '@redux/selectors/lists';

const classNames = require('classnames');

const useStyles = createUseStyles({
  todos,
  items
});

const TodosTrash = ({ listId, todosItems }) => {
  const classes = useStyles();

  return (
    <ul className={classNames({ [classes.todos]: true, [classes.items]: true })}>
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
