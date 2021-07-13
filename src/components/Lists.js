import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { getListsSort, getTodosItemsSort, getTodoSelected } from '../selectors';
import { LIST_TYPE } from '../constants';
import Placeholder from './Placeholder';
import List from './List';

const useStyles = createUseStyles({
  lists: {
    display: 'flex',
    justifyContent: 'center',
    padding: '90px 30px 0 30px',
    position: 'absolute'
  }
});

const Lists = ({ listsSort, todosSort, dragId }) => {
  const classes = useStyles();

  return (
    <Droppable
      droppableId='droppable-lists'
      direction='horizontal'
      type={LIST_TYPE}
    >
      {(provided) => (
        <ul
          className={classes.lists}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {listsSort['1'].map((listId, index) => (
            <Draggable
              key={listId}
              draggableId={`list-${listId}`}
              index={index}
            >
              {(provided) => (
                <List listId={listId} provided={provided} />
              )}
            </Draggable>
          ))}
          {listsSort['1'].map((listId, listIndex) =>
            todosSort[listId].map((todoId, index) => (
              <Placeholder
                dragId={dragId}
                key={todoId}
                todoId={todoId}
                listIndex={listIndex}
                index={index}
              />
            ))
          )}
          <div>{provided.placeholder}</div>
        </ul>
      )}
    </Droppable>
  );
};

Lists.propTypes = {
  listsSort: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired,
  dragId: PropTypes.string.isRequired
};

const mapStateToProps = () => ({
  listsSort: getListsSort(),
  todosSort: getTodosItemsSort(),
  dragId: getTodoSelected()
});

export default connect(mapStateToProps, null)(Lists);
