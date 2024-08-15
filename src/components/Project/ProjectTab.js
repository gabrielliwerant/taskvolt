/**
 * src/components/ProjectTab.js
 *
 * Renders the project-specific tab that contains project-related icons.
 *
 * KLUDGE: Helps avoid issues with `Tabs` component auto-adding props.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import { Tab } from '@components/lib/Tab';
import { Project } from '@components/Project';
import RemoveProjectDialog from '@components/RemoveProjectDialog';

import { makeId } from '@src/utils';
import { getProjectIsEditActive } from '@redux/selectors/projects';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';
import { projectsSlice } from '@redux/reducers/projects';

const ProjectTab = ({ id, onClick, isEditActive, addTodoSortSection, addList, initRemove }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Handle close action for todo list removal dialog.
   *
   * @returns {void}
   */
  const onDialogClose = () => setIsDialogOpen(false);

  /**
   * Handle the add list click action.
   *
   * @param {string} projectId
   * @returns {void}
   */
  const onClickAddList = projectId => () => {
    const listId = makeId();

    addTodoSortSection(listId);
    addList(listId, projectId);
  };

  /**
   * Handle remove attempt click action for projects, initiating dialog.
   *
   * We also save the project id we're attempting to delete for the removal dialog confirmation.
   *
   * @param {string} projectId
   * @returns {void}
   */
  const onClickInitRemoveProject = projectId => () => {
    setIsDialogOpen(true);
    initRemove(projectId);
  };

  return (
    <div role="button" onClick={onClick}>
      <Tab
        label={<Project key={id} id={id} />}
        icon={
          !isEditActive
            ?
              <Fragment>
                <Tooltip title='Add list to project'>
                  <IconButton onClick={onClickAddList(id)} ariaLabel='Add todo list'>
                    <AddIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete project'>
                  <IconButton onClick={onClickInitRemoveProject(id)} ariaLabel='Remove project'>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Fragment>
            : ''
        }
      />
      <RemoveProjectDialog open={isDialogOpen} onClose={onDialogClose} />
    </div>
  );
};

ProjectTab.propTypes = {
  id: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  addTodoSortSection: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  initRemove: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isEditActive: getProjectIsEditActive(ownProps.id)
});

const mapDispatchToProps = dispatch => ({
  addTodoSortSection: listId => dispatch(todosSlice.actions.addSort(listId)),
  addList: (listId, projectId) => dispatch(listsSlice.actions.add({ listId, projectId })),
  initRemove: projectId => dispatch(projectsSlice.actions.initRemove(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTab);
