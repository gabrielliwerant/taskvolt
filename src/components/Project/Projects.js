/**
 * src/components/Projects.js
 *
 * Renders the projects section.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddIcon from '@mui/icons-material/AddRounded';

import { Tab, Tabs } from '@components/lib/Tab';
import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import { ProjectTab } from '@components/Project';
import TrashTab from '@components/TrashTab';

import { makeId } from '@src/utils';
import { VIEWS } from '@main/constants';
import { getAppActiveTab } from '@redux/selectors/app';
import { getProjectsSort } from '@redux/selectors/projects';
import { appSlice } from '@redux/reducers/app';
import { projectsSlice } from '@redux/reducers/projects';
import { listsSlice } from '@redux/reducers/lists';


const Projects = ({
  projectsSort,
  activeTab,
  addProject,
  addListSortSection,
  setActive,
  setView,
  setActiveTab
}) => {
  /**
   * Handles a click action on a given tab (project id) which both switches tabs, and sets the
   * active view to the selected project.
   *
   * @param {string} id Project id
   * @param {integer} index Tab index
   * @returns {void}
   */
  const onTabClick = (id, index) => () => {
    setView(VIEWS.PROJECTS);
    setActiveTab(index);
    setActive(id);
  };

  /**
   * Handle the add project click, which generates a new project along with associated list sorting.
   *
   * @returns {void}
   */
  const onAddProjectClick = () => {
    const id = makeId();

    addProject(id);
    addListSortSection(id);
  };

  /**
   * Handles a click action for the trash tab by setting the active view.
   *
   * @param {integer} index Tab index
   * @returns {void}
   */
  const onTrashTabClick = index => () => {
    setView(VIEWS.TRASH);
    setActiveTab(index);
  };

  return (
    <Tabs value={activeTab}>
      {projectsSort['1'].map((id, index) =>
        <ProjectTab key={id} id={id} onClick={onTabClick(id, index)} />
      )}
      <Tab
        icon={
          <Tooltip title='Add project'>
            <IconButton onClick={onAddProjectClick} ariaLabel='Add project'>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        }
      />
      <TrashTab onClick={onTrashTabClick(projectsSort['1'].length + 1)} />
    </Tabs>
  );
};

Projects.propTypes = {
  projectsSort: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  addProject: PropTypes.func.isRequired,
  addListSortSection: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort(),
  activeTab: getAppActiveTab()
});

const mapDispatchToProps = dispatch => ({
  addProject: id => dispatch(projectsSlice.actions.add(id)),
  addListSortSection: id => dispatch(listsSlice.actions.addSort(id)),
  setActive: id => dispatch(projectsSlice.actions.setActive(id)),
  setView: view => dispatch(appSlice.actions.setView(view)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
