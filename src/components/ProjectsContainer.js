/**
 * src/components/ProjectsContainer.js
 *
 * Handle the projects toolbar sections along with drag and drop, trash tab and add project tab.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { Tabs } from '@components/lib/Tab';
import { Projects } from '@components/Project';
import TrashTab from '@components/TrashTab';
import AddProjectTab from '@components/AddProjectTab';

import { getDragDropId } from '@src/utils';
import { VIEWS } from '@main/constants';
import { getAppView } from '@redux/selectors/app';
import {
  getProjectsSort,
  getProjectActive,
  getProjectSortIndexById
} from '@redux/selectors/projects';
import { appSlice } from '@redux/reducers/app';
import { projectsSlice } from '@redux/reducers/projects';

const ProjectsContainer = ({
  projectsSort,
  activeId,
  view,
  setActive,
  reorder,
  setView,
  setActiveTab
}) => {
  /**
   * Handles a click action for the trash tab by setting the active view.
   *
   * @param {integer} index Tab index
   * @returns {void}
   */
  const onTrashTabClick = index => () => {
    setView(VIEWS.TRASH);

    // Disable active for all projects while in `trash` view mode
    setActiveTab(false);
    setActive('');
  };

  /**
   * Handle drag completed action.
   *
   * Update reordering state and active tab.
   *
   * @param {object} result
   * @returns {void}
   */
  const onDragEnd = result => {
    if (!result.destination) return;

    reorder(getDragDropId(result.draggableId), result.source.index, result.destination.index);
    setActiveTab(getProjectSortIndexById(activeId));
  };

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Projects />
      </DragDropContext>
      <Tabs value={view === VIEWS.TRASH ? 1 : false}>
        <AddProjectTab />
        <TrashTab onClick={onTrashTabClick(projectsSort.length + 1)} />
      </Tabs>
    </Fragment>
  );
};

ProjectsContainer.propTypes = {
  projectsSort: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeId: PropTypes.string.isRequired,
  view: PropTypes.oneOf([VIEWS.START, VIEWS.PROJECTS, VIEWS.TRASH]).isRequired,
  setActive: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort(),
  activeId: getProjectActive(),
  view: getAppView()
});

const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch(projectsSlice.actions.setActive(id)),
  reorder: (id, oldIndex, newIndex) =>
    dispatch(projectsSlice.actions.reorder({ id, oldIndex, newIndex })),
  setView: view => dispatch(appSlice.actions.setView(view)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
