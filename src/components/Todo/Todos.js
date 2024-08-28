/**
 * src/components/Todo/Todos.js
 *
 * Renders a set of todo items with drag and drop functionality.
 */

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TodoPlaceholder } from '@components/Todo';
import { Todo } from '@components/Todo';

import { todos, items } from '@components/Todo/styles';
import { getTodosHeight } from '@components/Todo/utils';
import { LIST_PADDING } from '@jss/constants';

import { TYPES } from '@src/constants';
import { getTodosItems, getTodosSort, getTodosDragSort } from '@redux/selectors/todos';

const classNames = require('classnames');

const useStyles = createUseStyles({
  todos,
  items
});

const Todos = ({ listId, todosItems, todosSort, todosDragSort }) => {
  const classes = useStyles();
  const [placeholdersHeight, setPlaceholdersHeight] = useState(0);

  useEffect(() => {
    setPlaceholdersHeight(getTodosHeight(listId));
  }, [todosItems, todosDragSort]);

  return (
    <Fragment>
      <Droppable droppableId={`droppable-todos-${listId}`} type={TYPES.TODO}>
        {(provided) => (
          <ul
            className={classNames({ [classes.todos]: true, [classes.items]: true })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todosSort[listId].map((todoId, index) => (
              <Draggable key={todoId} draggableId={`todo-${todoId}`} index={index}>
                {(provided) => <Todo provided={provided} id={todoId} todo={todosItems[todoId]} />}
              </Draggable>
            ))}
            <div>{provided.placeholder}</div>
          </ul>
        )}
      </Droppable>
      <ul className={classes.todos} style={{ marginTop: `-${placeholdersHeight}px` }}>
        {todosDragSort[listId].map((todoId, index) => (
          <TodoPlaceholder
            key={`placeholder-${todoId}`}
            id={todoId}
            listId={listId}
            index={index}
          />
        ))}
      </ul>
    </Fragment>
  );
};

Todos.propTypes = {
  listId: PropTypes.string.isRequired,
  todosItems: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired,
  todosDragSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  todosItems: getTodosItems(),
  todosSort: getTodosSort(),
  todosDragSort: getTodosDragSort()
});

export default connect(mapStateToProps, null)(Todos);
