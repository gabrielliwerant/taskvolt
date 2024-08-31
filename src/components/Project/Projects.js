/**
 * src/components/Projects.js
 *
 * Renders the projects section tabs.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { ProjectTab } from '@components/Project';

import { flex } from '@jss/styles';

import { TYPES } from '@src/constants';
import { VIEWS } from '@main/constants';
import { getAppActiveTab } from '@redux/selectors/app';
import { getProjectsSort, hasProjects } from '@redux/selectors/projects';
import { appSlice } from '@redux/reducers/app';
import { projectsSlice } from '@redux/reducers/projects';

const useStyles = createUseStyles({
  flex
});

const Projects = ({
  projectsSort,
  hasProjects,
  activeTab,
  setActive,
  setView,
  setActiveTab
}) => {
  const classes = useStyles();

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

  return (
    <Fragment>
      {hasProjects &&
        <Droppable droppableId='droppable-projects' direction='horizontal' type={TYPES.PROJECTS}>
          {(provided) => (
            <Fragment>
              <div className={classes.flex} ref={provided.innerRef} {...provided.droppableProps}>
                {projectsSort.map((id, index) =>
                  <Draggable key={id} draggableId={`project-${id}`} index={index}>
                    {provided => (
                      <ProjectTab
                        key={id}
                        id={id}
                        index={index}
                        onClick={onTabClick(id, index)}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                )}
              </div>
              <div style={{ height: 0 }}>{provided.placeholder}</div>
            </Fragment>
          )}
        </Droppable>
      }
    </Fragment>
  );
};

Projects.propTypes = {
  projectsSort: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasProjects: PropTypes.bool.isRequired,
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  setActive: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort(),
  hasProjects: hasProjects(),
  activeTab: getAppActiveTab()
});

const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch(projectsSlice.actions.setActive(id)),
  setView: view => dispatch(appSlice.actions.setView(view)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
