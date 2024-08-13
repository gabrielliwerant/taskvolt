import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { getDraggableId } from '@src/utils';
import { TYPES } from '@src/constants';
import { listsSlice } from '@redux/reducers/lists';
import { todosSlice } from '@redux/reducers/todos';
import { getProjectActive } from '@redux/selectors/projects';

import Lists from './Lists';

const useStyles = createUseStyles({
  container: {
    margin: 'auto'
  }
});

const ListsContainer = ({ projectId, reorderTodo, selectTodo, reorderList, selectList, drop }) => {
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
      reorderList(
        getDraggableId(result.draggableId),
        projectId,
        result.source.index,
        result.destination.index
      );
      selectList('');
    }

    if (result.type === TYPES.TODO) {
      reorderTodo(
        getDraggableId(result.source.droppableId),
        result.source.index,
        result.destination.index
      );
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
  projectId: PropTypes.string.isRequired,
  reorderTodo: PropTypes.func.isRequired,
  selectTodo: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired,
  selectList: PropTypes.func.isRequired,
  drop: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectId: getProjectActive()
});

const mapDispatchToProps = dispatch => ({
  reorderTodo: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder({ listId, oldIndex, newIndex })
  ),
  selectTodo: id => dispatch(todosSlice.actions.select(id)),
  reorderList: (listId, projectId, oldIndex, newIndex) => dispatch(
    listsSlice.actions.reorder({ listId, projectId, oldIndex, newIndex })
  ),
  selectList: id => dispatch(listsSlice.actions.select(id)),
  drop: index => dispatch(listsSlice.actions.drop(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
