/**
 * src/components/Todo/Todos.js
 *
 * Renders a set of todo items with drag and drop functionality.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Placeholder from '@components/Placeholder';
import { Todo } from '@components/Todo';

import { todos } from '@components/Todo/styles';

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
        <ul className={classes.todos} {...provided.droppableProps} ref={provided.innerRef}>
          {todosSort[listId].map((todoId, index) => (
            <Draggable key={todoId} draggableId={`item-${todoId}`} index={index}>
              {(provided) => <Todo provided={provided} todo={todosItems[todoId]} />}
            </Draggable>
          ))}
          {todosSort[listId].map((todoId, index) => (
            <Placeholder
              key={todoId}
              id={todoId}
              listIndex={getIndexFromId(listId, listSort)}
              index={index}
            />
          ))}
          <div>{provided.placeholder}</div>
        </ul>
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
