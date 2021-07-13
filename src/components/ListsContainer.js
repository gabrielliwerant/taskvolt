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

const ListsContainer = ({ reorder, select, reorderList, selectList }) => {
  const classes = useStyles();

  const onDragEnd = result => {
    if (!result.destination) {
      if (result.type === LIST_TYPE) {
        selectList({ id: '' });
        return;
      }

      if (result.type === ITEM_TYPE) {
        select({ id: '' });
        return;
      }
    }

    if (result.type === LIST_TYPE) {
      reorderList({
        listId: getDraggableId(result.draggableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
      selectList({ id: '' });
    }

    if (result.type === ITEM_TYPE) {
      reorder({
        listId: getDraggableId(result.source.droppableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
      select({ id: '' });
    }
  };

  const onDragStart = start => {
    if (start.type === LIST_TYPE) {
      selectList({ id: getDraggableId(start.draggableId) });
    }

    if (start.type === ITEM_TYPE) {
      select({ id: getDraggableId(start.draggableId) });
    }
  };

  return (
    <div className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Lists />
      </DragDropContext>
    </div>
  );
};

ListsContainer.propTypes = {
  reorder: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired,
  selectList: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  reorder: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  select: id => dispatch(todosSlice.actions.select(id)),
  reorderList: (listId, oldIndex, newIndex) => dispatch(
    listSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  selectList: id => dispatch(listSlice.actions.select(id))
});

export default connect(null, mapDispatchToProps)(ListsContainer);
