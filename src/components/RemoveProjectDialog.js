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

import { getProjectRemoving, getProjectIdBySortIndex } from '@redux/selectors/projects';
import { getAppActiveTab } from '@redux/selectors/app';
import { projectsSlice } from '@redux/reducers/projects';
import { appSlice } from '@redux/reducers/app';

const RemoveProjectDialog = ({ open, onClose, id, activeTab, remove, setActive, setActiveTab }) => {
  /**
   * Handles the list removal action.
   *
   * @param {object} e Event
   * @returns {void}
   */
  const onRemove = e => {
    e.stopPropagation(); // Prevent other tab onClick actions

    const newIndex = activeTab - 1;

    setActiveTab(newIndex);
    setActive(getProjectIdBySortIndex(newIndex));
    remove(id);
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
  remove: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  id: getProjectRemoving(),
  activeTab: getAppActiveTab()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: id => dispatch(projectsSlice.actions.remove(id)),
  setActive: id => dispatch(projectsSlice.actions.setActive(id)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveProjectDialog);
