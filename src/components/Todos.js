import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TYPES } from '@src/constants';
import { getIndexFromId } from '@src/utils';
import { getTodosItems, getTodosSort } from '@redux/selectors/todos';
import { getListsSort } from '@redux/selectors/lists';

import { LIST_PADDING } from '@jss/constants';

import Placeholder from './Placeholder';
import Todo from './Todo';

const useStyles = createUseStyles({
  list: {
    marginTop: `${LIST_PADDING}px`
  }
});

const Todos = ({ listId, listSort, todosItems, todosSort }) => {
  const classes = useStyles();

  return (
    <Droppable droppableId={`droppable-items-${listId}`} type={TYPES.TODO}>
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
