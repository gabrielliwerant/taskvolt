import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { getDraggableId } from '@src/utils';
import { TYPES } from '@src/constants';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';

import Lists from './Lists';

const useStyles = createUseStyles({
  container: {
    margin: 'auto'
  }
});

const ListsContainer = ({ reorderTodo, selectTodo, reorderList, selectList, drop }) => {
  const classes = useStyles();

  const onDragEnd = result => {
    if (!result.destination) {
      if (result.type === TYPES.LIST) {
        selectList('');
        drop(null);
        return;
      }

      if (result.type === TYPES.TODO) {
        selectTodo('');
        return;
      }
    }

    if (result.type === TYPES.LIST) {
      reorderList({
        id: getDraggableId(result.draggableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
      selectList('');
    }

    if (result.type === TYPES.TODO) {
      reorderTodo({
        listId: getDraggableId(result.source.droppableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
      selectTodo('');
    }
  };

  const onDragStart = start => {
    if (start.type === TYPES.LIST) {
      selectList(getDraggableId(start.draggableId));
      drop(start.source.index);
    }

    if (start.type === TYPES.TODO) selectTodo(getDraggableId(start.draggableId));
  };

  const onDragUpdate = update => {
    if (update.type === TYPES.LIST) {
      if (update.destination) drop(update.destination.index);
    }
  };

  return (
    <div className={classes.container}>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <Lists />
      </DragDropContext>
    </div>
  );
};

ListsContainer.propTypes = {
  reorderTodo: PropTypes.func.isRequired,
  selectTodo: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired,
  selectList: PropTypes.func.isRequired,
  drop: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  reorderTodo: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  selectTodo: id => dispatch(todosSlice.actions.select(id)),
  reorderList: (listId, oldIndex, newIndex) => dispatch(
    listsSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  selectList: id => dispatch(listsSlice.actions.select(id)),
  drop: index => dispatch(listsSlice.actions.drop(index))
});

export default connect(null, mapDispatchToProps)(ListsContainer);
