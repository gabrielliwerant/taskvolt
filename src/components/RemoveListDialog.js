/**
 * src/components/RemoveListDialog.js
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
import { MyButton } from '@components/lib/Button';

import { getListRemoving } from '@redux/selectors/lists';
import { listsSlice } from '@redux/reducers/lists';

const RemoveListDialog = ({ open, onClose, id, remove }) => {
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
        <DialogTitle id="remove-list-dialog-title">Delete Todo List</DialogTitle>
        <DialogContent>
          <DialogContentText id="remove-list-dialog-description">
            This action will delete the entire todo list, including all todo items it contains.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Fragment>
            <MyButton onClick={onRemove} color='error'>Delete List</MyButton>
            <MyButton onClick={onClose}>Cancel</MyButton>
          </Fragment>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
};

RemoveListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  id: getListRemoving()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: id => dispatch(listsSlice.actions.remove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveListDialog);
