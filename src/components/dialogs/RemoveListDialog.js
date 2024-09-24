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
import { Button } from '@components/lib/Button';

import { getListRemoving } from '@redux/selectors/lists';
import { getTodoIdsByListId } from '@redux/selectors/todos';
import { listsSlice } from '@redux/reducers/lists';
import { todosSlice } from '@redux/reducers/todos';

const RemoveListDialog = ({ open, onClose, id, removeList, removeTodo }) => {
  /**
   * Handles the list removal action.
   *
   * @returns {void}
   */
  const onRemove = () => {
    getTodoIdsByListId(id).forEach(todoId => removeTodo(todoId));

    removeList(id);
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
            <Button onClick={onRemove} color='error'>Delete List</Button>
            <Button onClick={onClose}>Cancel</Button>
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
  removeList: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  id: getListRemoving()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeList: id => dispatch(listsSlice.actions.remove(id)),
  removeTodo: id => dispatch(todosSlice.actions.remove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveListDialog);
