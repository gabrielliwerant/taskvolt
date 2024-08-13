/**
 * src/components/ProjectTab.js
 *
 * Renders the project-specific tab that contains project-related icons.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddRounded from '@mui/icons-material/AddRounded';

import { IconButton } from '@components/lib/IconButton';
import { Tab } from '@components/lib/Tab';
import Project from '@components/Project';

import { makeId } from '@src/utils';
import { getProjectIsEditActive } from '@redux/selectors/projects';
import { listsSlice } from '@redux/reducers/lists';
import { todosSlice } from '@redux/reducers/todos';

const ProjectTab = ({ id, isEditActive, addTodoSortSection, addList }) => {
  /**
   * Handle the add list click action.
   *
   * @param {string} projectId
   * @returns {void}
   */
  const onClick = projectId => () => {
    const listId = makeId();

    addTodoSortSection(listId);
    addList(listId, projectId);
  };

  return (
    <Tab
      label={<Project key={id} id={id} />}
      icon={
        !isEditActive
          ?
            <IconButton onClick={onClick(id)} ariaLabel='Add todo list'>
              <AddRounded fontSize='small' />
            </IconButton>
          : ''
      }
    />
  );
};

ProjectTab.propTypes = {
  id: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  addTodoSortSection: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isEditActive: getProjectIsEditActive(ownProps.id)
});

const mapDispatchToProps = dispatch => ({
  addTodoSortSection: listId => dispatch(todosSlice.actions.addSort(listId)),
  addList: (listId, projectId) => dispatch(listsSlice.actions.add({ listId, projectId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTab);
