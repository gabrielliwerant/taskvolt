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
import { getProjectsSort, getProjectRemoving } from '@redux/selectors/projects';
import { getAppActiveTab } from '@redux/selectors/app';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';
import { projectsSlice } from '@redux/reducers/projects';
import { appSlice } from '@redux/reducers/app';

/**
 * Retrieve the index corresponding to an id within a given array.
 *
 * @param {array[string]} sortArr
 * @param {string} id
 * @returns {integer}
 */
const getSortIndexById = (sortArr, id) => sortArr.findIndex(index => index === id);

const RemoveProjectDialog = ({
  open,
  onClose,
  id,
  activeTab,
  projectsSort,
  removeList,
  removeTodo,
  removeProject,
  resetRemoving,
  setActive,
  setActiveTab
}) => {
  /**
   * Handles close action for dialog.
   *
   * @returns {void}
   */
  const onCloseHandler = () => {
    onClose();
    resetRemoving();
  };

  /**
   * Set the active tab and project state when removing a project and the current active tab is not
   * the first one.
   *
   * @returns {void}
   */
  const setActiveWhenFirstTabNotActive = () => {
    if (activeTab === 0) return;

    setActiveTab(activeTab - 1);
    setActive(projectsSort[getSortIndexById(projectsSort, id) - 1]);
  };

  /**
   * Set the active tab and project state when removing a project and the current active tab is the
   * first one.
   *
   * @returns {void}
   */
  const setActiveWhenFirstTabActive = () => {
    if (projectsSort.length <= 1 || activeTab !== 0) return;

    const newSort = projectsSort.toSpliced(getSortIndexById(projectsSort, id), 1);

    setActive(newSort[0]);
  };

  /**
   * Set the active tab and project state when removing a project and the current active is the last
   * remaining tab.
   *
   * @returns {void}
   */
  const setActiveWhenProjectsEmpty = () => {
    if (projectsSort.length > 1) return;

    setActiveTab(false);
    setActive('');
  };

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

    onCloseHandler();

    setActiveWhenFirstTabNotActive();
    setActiveWhenFirstTabActive();
    setActiveWhenProjectsEmpty();
  };

  return (
    <Dialog open={open} onClose={onCloseHandler}>
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
            <Button onClick={onCloseHandler}>Cancel</Button>
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
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  projectsSort: PropTypes.arrayOf(PropTypes.string),
  removeProject: PropTypes.func.isRequired,
  resetRemoving: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

RemoveProjectDialog.defaultProps = {
  projectsSort: []
};

const mapStateToProps = () => ({
  id: getProjectRemoving(),
  activeTab: getAppActiveTab(),
  projectsSort: getProjectsSort()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeProject: id => dispatch(projectsSlice.actions.remove(id)),
  resetRemoving: () => dispatch(projectsSlice.actions.setRemoving('')),
  removeList: id => dispatch(listsSlice.actions.remove(id)),
  removeTodo: id => dispatch(todosSlice.actions.remove(id)),
  setActive: id => dispatch(projectsSlice.actions.setActive(id)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveProjectDialog);
