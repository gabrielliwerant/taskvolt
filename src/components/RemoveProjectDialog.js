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

import { getProjectRemoving } from '@redux/selectors/projects';
import { projectsSlice } from '@redux/reducers/projects';

const RemoveProjectDialog = ({ open, onClose, id, remove }) => {
  /**
   * Handles the list removal action.
   *
   * @returns {void}
   */
  const onRemove = () => {
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
  remove: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  id: getProjectRemoving()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: id => dispatch(projectsSlice.actions.remove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveProjectDialog);
