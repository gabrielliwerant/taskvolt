import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { getListsSort } from '../selectors';
import { todosSlice, listSlice } from '../reducers';
import { getDraggableId } from '../utilities';
import List from './List';

const useStyles = createUseStyles({
  lists: {
    display: 'flex',
    justifyContent: 'center',
    padding: '80px 30px 0 30px',
    position: 'absolute'
  }
});

const MyList = ({ listsSort, reorder, reorderList }) => {
  const classes = useStyles();
  const onDragEnd = result => {
    if (!result.destination) return;

    if (result.type === 'LIST') {
      reorderList({
        listId: getDraggableId(result.draggableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
    }

    if (result.type === 'ITEM') {
      reorder({
        listId: getDraggableId(result.source.droppableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId='droppable-lists'
        direction='horizontal'
        type='LIST'
      >
        {(provided) => (
          <ul
            className={classes.lists}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listsSort.map((listId, index) => (
              <Draggable
                key={listId}
                draggableId={`list-${listId}`}
                index={index}
              >
                {(provided) => <List listId={listId} provided={provided} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

MyList.propTypes = {
  listsSort: PropTypes.array.isRequired,
  reorder: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  listsSort: getListsSort()
});

const mapDispatchToProps = dispatch => ({
  reorder: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  reorderList: (listId, oldIndex, newIndex) => dispatch(
    listSlice.actions.reorder(listId, oldIndex, newIndex)
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
