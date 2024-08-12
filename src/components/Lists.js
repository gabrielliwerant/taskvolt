/**
 * src/components/List.js
 *
 * Renders the drag-droppable list of all todo lists for a given project.
 *
 * Also handles dialogs associated with todo lists.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Placeholder from '@components/Placeholder';
import List from '@components/List';
import RemoveListDialog from '@components/RemoveListDialog';

import { TOP_OFFSET } from '@jss/constants';

import { TYPES } from '@src/constants';
import { getListsSort } from '@redux/selectors/lists';
import { listsSlice } from '@redux/reducers/lists';

const useStyles = createUseStyles({
  lists: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${TOP_OFFSET}px 30px 0 30px`,
    position: 'absolute'
  }
});

const Lists = ({ listsSort, initRemove }) => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Handle close action for todo list removal dialog.
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
  const onRemoveClick = id => () => {
    setIsDialogOpen(true);
    initRemove(id);
  };

  return (
    <Fragment>
      <Droppable droppableId='droppable-lists' direction='horizontal' type={TYPES.LIST}>
        {(provided) => (
          <ul className={classes.lists} {...provided.droppableProps} ref={provided.innerRef}>
            {listsSort['1'].map((id, index) => (
              <Draggable key={id} draggableId={`list-${id}`} index={index}>
                {(provided) => (
                  <List id={id} remove={onRemoveClick(id)} listIndex={index} provided={provided} />
                )}
              </Draggable>
            ))}
            {listsSort['1'].map((id, listIndex) => (
              <Placeholder
                key={id}
                id={id}
                listIndex={listIndex}
                index={listIndex}
                variant='list'
              />
            ))}
            <div>{provided.placeholder}</div>
          </ul>
        )}
      </Droppable>
      <RemoveListDialog open={isDialogOpen} onClose={onDialogClose} />
    </Fragment>
  );
};

Lists.propTypes = {
  listsSort: PropTypes.object.isRequired,
  initRemove: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  listsSort: getListsSort()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initRemove: id => dispatch(listsSlice.actions.initRemove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
