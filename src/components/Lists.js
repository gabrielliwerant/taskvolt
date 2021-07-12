import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import {
  BORDER_OFFSET,
  TODO_WIDTH,
  TODO_HEIGHT,
  TODO_MARGIN,
  TODO_POSITION,
  LIST_POSITION
} from '../jss/constants';
import { getListsSort, getTodosItemsSort } from '../selectors';
import { LIST_TYPE } from '../constants';
import List from './List';

const useStyles = createUseStyles({
  lists: {
    display: 'flex',
    justifyContent: 'center',
    padding: '90px 30px 0 30px',
    position: 'absolute'
  },
  placeholder: {
    position: 'absolute',
    width: `${TODO_WIDTH}px`,
    height: `${TODO_HEIGHT}px`,
    marginTop: `${TODO_POSITION}px`,
    borderRadius: '4px',
    zIndex: 0,
    border: '1px dashed #aaaaaa',
    background: '#dddddd',
    left: '47px'
  },
});

const Lists = ({ listsSort, todosSort }) => {
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
          {listsSort['1'].map((listId, listIndex) => (
            <>
              <Draggable
                key={listId}
                draggableId={`list-${listId}`}
                index={listIndex}
              >
                {(provided) => <List listId={listId} provided={provided} />}
              </Draggable>

              {todosSort[listId].map((todoId, index) => {
                const marginTop =
                  `${TODO_POSITION + (TODO_HEIGHT + BORDER_OFFSET + TODO_MARGIN) * index}px`;
                const marginLeft = `${listIndex * LIST_POSITION}px`;

                return (
                  <div
                    key={todoId}
                    style={{ marginTop, marginLeft }}
                    className={classes.placeholder}
                  />
                );
              })}
            </>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

Lists.propTypes = {
  listsSort: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  listsSort: getListsSort(),
  todosSort: getTodosItemsSort()
});

export default connect(mapStateToProps, null)(Lists);
