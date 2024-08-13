import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { getDragDropId } from '@src/utils';
import { TYPES } from '@src/constants';
import { listsSlice } from '@redux/reducers/lists';
import { todosSlice } from '@redux/reducers/todos';
import { getProjectActive } from '@redux/selectors/projects';
import { hasListItemById } from '@redux/selectors/lists';

import Lists from '@components/Lists';

const useStyles = createUseStyles({
  container: {
    margin: 'auto'
  }
});

const ListsContainer = ({
  projectId,
  reorderTodo,
  reorderTodoToList,
  selectTodo,
  reorderList,
  selectList,
  drop
}) => {
  const classes = useStyles();

  const onDragEnd = result => {
    switch (result.type) {
      case TYPES.TODO:
        selectTodo('');

        if (!result.destination) return;

        const destinationId = getDragDropId(result.destination.droppableId);
        const sourceId = getDragDropId(result.source.droppableId);

        if (hasListItemById(destinationId)) {
          reorderTodoToList(sourceId, destinationId, result.source.index, result.destination.index);
          return;
        }

        reorderTodo(sourceId, result.source.index, result.destination.index);
        break;
      case TYPES.LIST:
        selectList('');

        if (!result.destination) {
          drop(null);
          return;
        }

        reorderList(
          getDragDropId(result.draggableId),
          projectId,
          result.source.index,
          result.destination.index
        );
        break;
    }
  };

  const onDragStart = start => {
    switch (start.type) {
      case TYPES.TODO:
        selectTodo(getDragDropId(start.draggableId));
        break;
      case TYPES.LIST:
        selectList(getDragDropId(start.draggableId));
        drop(start.source.index);
        break;
    }
  };

  const onDragUpdate = update => {
    switch (update.type) {
      case TYPES.LIST:
        if (update.destination) drop(update.destination.index);
        break;
    }
  };

  return (
    <div className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        <Lists />
      </DragDropContext>
    </div>
  );
};

ListsContainer.propTypes = {
  projectId: PropTypes.string.isRequired,
  reorderTodo: PropTypes.func.isRequired,
  reorderTodoToList: PropTypes.func.isRequired,
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
  reorderTodoToList: (oldListId, newListId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorderToList({ oldListId, newListId, oldIndex, newIndex })
  ),
  selectTodo: id => dispatch(todosSlice.actions.select(id)),
  reorderList: (listId, projectId, oldIndex, newIndex) => dispatch(
    listsSlice.actions.reorder({ listId, projectId, oldIndex, newIndex })
  ),
  selectList: id => dispatch(listsSlice.actions.select(id)),
  drop: index => dispatch(listsSlice.actions.drop(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
