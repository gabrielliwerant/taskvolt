/**
 * src/components/List/ListsTrash.js
 *
 * Renders all lists that have at least one removed item or are themselves removed.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { ListTrash } from '@components/List';
import MessageLarge from '@components/MessageLarge';
import DeleteListDialog from '@components/DeleteListDialog';

import { lists } from '@components/List/styles';

import { listsSlice } from '@redux/reducers/lists';

const useStyles = createUseStyles({
  lists
});

const ListsTrash = ({ listIds, initExpunge }) => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Handle close action for todo list expunging dialog.
   *
   * @returns {void}
   */
  const onDialogClose = () => setIsDialogOpen(false);

  /**
   * Handle remove attempt click action for todo list, initiating dialog.
   *
   * We also save the todo list id we're attempting to delete for the removal dialog confirmation.
   *
   * @returns {void}
   */
  const onExpungeClick = id => () => {
    setIsDialogOpen(true);
    initExpunge(id);
  };

  return (
    <Fragment>
      {!!listIds.length &&
        <ul className={classes.lists}>
          {listIds.map(id => <ListTrash key={id} id={id} expunge={onExpungeClick(id)} />)}
        </ul>
      }
      {!listIds.length && <MessageLarge>No Removed Items...</MessageLarge>}
      <DeleteListDialog open={isDialogOpen} onClose={onDialogClose} />
    </Fragment>
  );
};

ListsTrash.propTypes = {
  listIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  initExpunge: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  initExpunge: id => dispatch(listsSlice.actions.initRemove(id))
});

export default connect(null, mapDispatchToProps)(ListsTrash);
