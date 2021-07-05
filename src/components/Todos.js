import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { getTodosItems, getTodosItemsSort } from '../selectors';
import { ITEM_TYPE } from '../constants';
import Todo from './Todo';

const useStyles = createUseStyles({
  list: {
    marginTop: '15px'
  }
});

const Todos = ({ listId, todosItems, todosSort }) => {
  const classes = useStyles();

  return (
    <Droppable droppableId={`droppable-items-${listId}`} type={ITEM_TYPE}>
      {(provided) => (
        <ul
          className={classes.list}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todosSort[listId].map((todoId, index) => (
            <Draggable
              key={todoId}
              draggableId={`item-${todoId}`}
              index={index}
            >
              {(provided) => (
                <Todo provided={provided} todo={todosItems[todoId]} />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

Todos.propTypes = {
  listId: PropTypes.string.isRequired,
  todosItems: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  todosItems: getTodosItems(),
  todosSort: getTodosItemsSort()
});

export default connect(mapStateToProps, null)(Todos);
