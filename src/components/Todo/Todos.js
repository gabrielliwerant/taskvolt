/**
 * src/components/Todo/Todos.js
 *
 * Renders a set of todo items with drag and drop functionality.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TodoPlaceholder } from '@components/Todo';
import { Todo } from '@components/Todo';

import { todos } from '@components/Todo/styles';
import { getTodosHeight } from '@components/Todo/utils';
import { LIST_PADDING } from '@jss/constants';

import { TYPES } from '@src/constants';
import { getIndexFromId } from '@src/utils';
import { getTodosItems, getTodosSort } from '@redux/selectors/todos';
import { getListsSort } from '@redux/selectors/lists';

const useStyles = createUseStyles({
  todos
});

const Todos = ({ listId, listSort, todosItems, todosSort }) => {
  const classes = useStyles();

  return (
    <Droppable droppableId={`droppable-items-${listId}`} type={TYPES.TODO}>
      {(provided) => (
        <Fragment>
          <ul className={classes.todos} {...provided.droppableProps} ref={provided.innerRef}>
            {todosSort[listId].map((todoId, index) => (
              <Draggable key={todoId} draggableId={`item-${todoId}`} index={index}>
                {(provided) => <Todo provided={provided} id={todoId} todo={todosItems[todoId]} />}
              </Draggable>
            ))}
            <div>{provided.placeholder}</div>
          </ul>
          <ul
            className={classes.todos}
            style={{ marginTop: `-${getTodosHeight(todosSort[listId])}px` }}
          >
            {todosSort[listId].map((todoId, index) => (
              <TodoPlaceholder
                key={`placeholder-${todoId}`}
                id={todoId}
                listIndex={getIndexFromId(listId, listSort)}
                index={index}
              />
            ))}
          </ul>
        </Fragment>
      )}
    </Droppable>
  );
};

Todos.propTypes = {
  listId: PropTypes.string.isRequired,
  listSort: PropTypes.object.isRequired,
  todosItems: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  listSort: getListsSort(),
  todosItems: getTodosItems(),
  todosSort: getTodosSort()
});

export default connect(mapStateToProps, null)(Todos);
