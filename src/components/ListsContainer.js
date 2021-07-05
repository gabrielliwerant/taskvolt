import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { todosSlice, listSlice } from '../reducers';
import { getDraggableId } from '../utilities';
import { LIST_TYPE, ITEM_TYPE } from '../constants';
import Lists from './Lists';

const useStyles = createUseStyles({
  container: {
    margin: 'auto'
  }
});

const ListsContainer = ({ reorder, reorderList }) => {
  const classes = useStyles();
  const onDragEnd = result => {
    if (!result.destination) return;

    if (result.type === LIST_TYPE) {
      reorderList({
        listId: getDraggableId(result.draggableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
    }

    if (result.type === ITEM_TYPE) {
      reorder({
        listId: getDraggableId(result.source.droppableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
    }
  };

  return (
    <div className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Lists />
      </DragDropContext>
    </div>
  );
};

ListsContainer.propTypes = {
  reorder: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  reorder: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  reorderList: (listId, oldIndex, newIndex) => dispatch(
    listSlice.actions.reorder(listId, oldIndex, newIndex)
  )
});

export default connect(null, mapDispatchToProps)(ListsContainer);
