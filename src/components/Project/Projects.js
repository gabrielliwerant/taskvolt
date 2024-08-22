/**
 * src/components/Projects.js
 *
 * Renders the projects section.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Tabs } from '@components/lib/Tab';
import { ProjectTab } from '@components/Project';
import TrashTab from '@components/TrashTab';
import AddProjectTab from '@components/AddProjectTab';

import { VIEWS } from '@main/constants';
import { getAppActiveTab } from '@redux/selectors/app';
import { getProjectsSort } from '@redux/selectors/projects';
import { appSlice } from '@redux/reducers/app';
import { projectsSlice } from '@redux/reducers/projects';

const Projects = ({ projectsSort, activeTab, setActive, setView, setActiveTab }) => {
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
   * Handles a click action for the trash tab by setting the active view.
   *
   * @param {integer} index Tab index
   * @returns {void}
   */
  const onTrashTabClick = index => () => {
    setView(VIEWS.TRASH);
    setActiveTab(index);
    setActive(''); // Disable active for all projects while in `trash` view mode
  };

  return (
    <Tabs value={activeTab}>
      {projectsSort.map((id, index) =>
        <ProjectTab key={id} id={id} onClick={onTabClick(id, index)} />
      )}
      <AddProjectTab />
      <TrashTab onClick={onTrashTabClick(projectsSort.length + 1)} />
    </Tabs>
  );
};

Projects.propTypes = {
  projectsSort: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  setActive: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort(),
  activeTab: getAppActiveTab()
});

const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch(projectsSlice.actions.setActive(id)),
  setView: view => dispatch(appSlice.actions.setView(view)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
