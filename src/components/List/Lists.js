/**
 * src/components/List/Lists.js
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

import { List } from '@components/List';
import Placeholder from '@components/Placeholder';
import RemoveListDialog from '@components/RemoveListDialog';
import MessageLarge from '@components/MessageLarge';

import { lists } from '@components/List/styles';

import { TYPES } from '@src/constants';
import { getProjectActive } from '@redux/selectors/projects';
import { hasListsByProjectId, getListsSort } from '@redux/selectors/lists';
import { listsSlice } from '@redux/reducers/lists';

const useStyles = createUseStyles({
  lists
});

const Lists = ({ projectId, hasLists, listsSort, initRemove }) => {
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
      {hasLists &&
        <Droppable droppableId='droppable-lists' direction='horizontal' type={TYPES.LIST}>
          {(provided) => (
            <ul className={classes.lists} {...provided.droppableProps} ref={provided.innerRef}>
              {listsSort[projectId].map((id, index) => (
                <Draggable key={id} draggableId={`list-${id}`} index={index}>
                  {(provided) => (
                    <List
                      id={id}
                      remove={onRemoveClick(id)}
                      listIndex={index}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {listsSort[projectId].map((id, listIndex) => (
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
      }
      {!hasLists && <MessageLarge>Create a List to Begin...</MessageLarge>}
      <RemoveListDialog open={isDialogOpen} onClose={onDialogClose} />
    </Fragment>
  );
};

Lists.propTypes = {
  projectId: PropTypes.string.isRequired,
  hasLists: PropTypes.bool.isRequired,
  listsSort: PropTypes.object,
  initRemove: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  const projectId = getProjectActive();

  return {
    projectId,
    hasLists: hasListsByProjectId(projectId),
    listsSort: getListsSort()
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  initRemove: id => dispatch(listsSlice.actions.initRemove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
