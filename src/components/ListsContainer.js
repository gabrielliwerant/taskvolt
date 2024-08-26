/**
 * src/components/ListsContainer.js
 *
 * Renders the container for all lists and the primary view for a selected project.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { Lists } from '@components/List';

import { getDragDropId } from '@src/utils';
import { TYPES } from '@src/constants';
import { listsSlice } from '@redux/reducers/lists';
import { todosSlice } from '@redux/reducers/todos';
import { getProjectActive } from '@redux/selectors/projects';
import { hasListItemById } from '@redux/selectors/lists';
import { getTodoIdBySortIndex, getTodoDragSortIndexById } from '@redux/selectors/todos';

const useStyles = createUseStyles({
  container: {
    margin: 'auto'
  }
});

const ListsContainer = ({
  projectId,
  todosDragSort,
  reorderTodo,
  reorderDragTodo,
  reorderTodoToList,
  selectTodo,
  reorderList,
  selectList,
  droppingList
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
        droppingList(null);

        if (!result.destination) return;

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
        break;
    }
  };

  const onDragUpdate = update => {
    switch (update.type) {
      case TYPES.TODO:
        if (!update.destination) return;

        const selectedId = getDragDropId(update.draggableId);
        const listId = getDragDropId(update.destination.droppableId);

        reorderDragTodo(
          listId,
          getTodoDragSortIndexById(selectedId, listId),
          update.destination.index
        );
        break;
      case TYPES.LIST:
        if (update.destination) droppingList(update.destination.index);
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
  reorderDragTodo: PropTypes.func.isRequired,
  reorderTodoToList: PropTypes.func.isRequired,
  selectTodo: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired,
  selectList: PropTypes.func.isRequired,
  droppingList: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectId: getProjectActive()
});

const mapDispatchToProps = dispatch => ({
  reorderTodo: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder({ listId, oldIndex, newIndex })
  ),
  reorderDragTodo: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorderDrag({ listId, oldIndex, newIndex })
  ),
  reorderTodoToList: (oldListId, newListId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorderToList({ oldListId, newListId, oldIndex, newIndex })
  ),
  selectTodo: id => dispatch(todosSlice.actions.select(id)),
  reorderList: (listId, projectId, oldIndex, newIndex) => dispatch(
    listsSlice.actions.reorder({ listId, projectId, oldIndex, newIndex })
  ),
  selectList: id => dispatch(listsSlice.actions.select(id)),
  droppingList: index => dispatch(listsSlice.actions.drop(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
