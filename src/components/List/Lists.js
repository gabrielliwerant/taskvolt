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

import { List, ListPlaceholder } from '@components/List';
import RemoveListDialog from '@components/RemoveListDialog';
import MessageLarge from '@components/MessageLarge';

import { lists } from '@components/List/styles';
import { flexCenterX } from '@jss/styles';
import { Z_INDEX } from '@jss/constants';

import { TYPES } from '@src/constants';
import { getProjectActive } from '@redux/selectors/projects';
import { hasListsByProjectId, getListsSort } from '@redux/selectors/lists';
import { listsSlice } from '@redux/reducers/lists';

const classNames = require('classnames');

const useStyles = createUseStyles({
  lists,
  flexCenterX,
  nonPlaceholders: {
    zIndex: Z_INDEX.LIST
  },
  placeholders: {
    zIndex: Z_INDEX.LIST_PLACEHOLDER
  }
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
            <Fragment>
              <ul
                className={classNames({
                  [classes.lists]: true,
                  [classes.flexCenterX]: true,
                  [classes.nonPlaceholders]: true
                })}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {listsSort[projectId].map((id, index) => (
                  <Draggable key={id} draggableId={`list-${id}`} index={index}>
                    {(provided) => (
                      <List id={id} remove={onRemoveClick(id)} provided={provided} />
                    )}
                  </Draggable>
                ))}
              </ul>
              <ul
                className={classNames({
                  [classes.lists]: true,
                  [classes.flexCenterX]: true,
                  [classes.placeholders]: true
                })}
              >
                {listsSort[projectId].map((id, listIndex) => (
                  <ListPlaceholder
                    key={id}
                    id={id}
                    projectId={projectId}
                    index={listIndex}
                  />
                ))}
              </ul>
              <div>{provided.placeholder}</div>
            </Fragment>
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
