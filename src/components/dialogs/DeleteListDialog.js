/**
 * src/components/DeleteListDialog.js
 *
 * Renders the dialog to confirm permanent expunging of a removed todo list.
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
import { getRemovedTodoIdsByListId } from '@redux/selectors/todos';
import { listsSlice } from '@redux/reducers/lists';
import { todosSlice } from '@redux/reducers/todos';

const DeleteListDialog = ({ open, onClose, id, expungeList, expungeTodo }) => {
  /**
   * Handles the list removal action.
   *
   * @returns {void}
   */
  const onExpunge = () => {
    getRemovedTodoIdsByListId(id).forEach(todoId => expungeTodo(todoId));

    expungeList(id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Fragment>
        <DialogTitle id="delete-list-dialog-title">Delete Todo List</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-list-dialog-description">
            This action will <strong>permanently</strong> delete the entire todo list, including all todo items it contains.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Fragment>
            <Button onClick={onExpunge} color='error'>Delete List</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Fragment>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
};

DeleteListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  expungeList: PropTypes.func.isRequired,
  expungeTodo: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  id: getListRemoving()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  expungeList: id => dispatch(listsSlice.actions.expunge(id)),
  expungeTodo: id => dispatch(todosSlice.actions.expunge(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteListDialog);
