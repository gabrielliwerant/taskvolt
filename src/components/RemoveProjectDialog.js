/**
 * src/components/RemoveProjectDialog.js
 *
 * Renders the dialog to confirm removal of the entire todo list.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@components/lib/Dialog';
import { Button } from '@components/lib/Button';

import { getTodoIdsByListId } from '@redux/selectors/todos';
import { getListsByProjectId } from '@redux/selectors/lists';
import { getProjectRemoving, getProjectIdBySortIndex } from '@redux/selectors/projects';
import { getAppActiveTab } from '@redux/selectors/app';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';
import { projectsSlice } from '@redux/reducers/projects';
import { appSlice } from '@redux/reducers/app';

const RemoveProjectDialog = ({
  open,
  onClose,
  id,
  activeTab,
  removeList,
  removeTodo,
  removeProject,
  setActive,
  setActiveTab
}) => {
  /**
   * Handles the list removal action.
   *
   * @param {object} e Event
   * @returns {void}
   */
  const onRemove = e => {
    e.stopPropagation(); // Prevent other tab onClick actions

    // Remove all todos and lists from project before removing the project
    getListsByProjectId(id).forEach(listId => {
      getTodoIdsByListId(listId).forEach(todoId => removeTodo(todoId));
      removeList(listId);
    });
    removeProject(id);

    const newIndex = activeTab - 1 >= 0 ? activeTab - 1 : 0;
    setActiveTab(newIndex);
    setActive(getProjectIdBySortIndex(newIndex));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Fragment>
        <DialogTitle id="remove-list-dialog-title">Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText id="remove-list-dialog-description">
            This action will delete the entire project, including all lists and todo items.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Fragment>
            <Button onClick={onRemove} color='error'>Delete Project</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Fragment>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
};

RemoveProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  activeTab: PropTypes.number.isRequired,
  removeProject: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  id: getProjectRemoving(),
  activeTab: getAppActiveTab()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeProject: id => dispatch(projectsSlice.actions.remove(id)),
  removeList: id => dispatch(listsSlice.actions.remove(id)),
  removeTodo: id => dispatch(todosSlice.actions.remove(id)),
  setActive: id => dispatch(projectsSlice.actions.setActive(id)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveProjectDialog);
