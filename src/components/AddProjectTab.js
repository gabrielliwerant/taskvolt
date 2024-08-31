/**
 * src/components/AddProjectTab.js
 *
 * Renders the tab that allows us to add new projects.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import AddCircleIcon from '@mui/icons-material/AddCircleRounded';

import { Tooltip } from '@components/lib/Tooltip';
import { Tab } from '@components/lib/Tab';
import TabButton from '@components/TabButton';

import { inactiveTab } from '@components/lib/Tab/styles';

import { makeId } from '@src/utils';
import { VIEWS } from '@main/constants';
import { getTrashTabIndex, getProjectSortIndexById, hasProjects } from '@redux/selectors/projects';
import { listsSlice } from '@redux/reducers/lists';
import { projectsSlice } from '@redux/reducers/projects';
import { appSlice } from '@redux/reducers/app';

const useStyles = createUseStyles({
  inactiveTab
});

const AddProjectTab = ({
  trashTabIndex,
  hasProjects,
  setProjectView,
  setActiveTab,
  setActiveProject,
  addProject,
  addListSortSection
}) => {
  const classes = useStyles();
  
  /**
   * Handle the add project click, which generates a new project along with associated list sorting.
   *
   * @returns {void}
   */
  const onAddProjectClick = () => {
    const id = makeId();

    addProject(id);
    addListSortSection(id);

    setProjectView();
    setActiveProject(id);
    setActiveTab(getProjectSortIndexById(id));
  };

  return (
    <TabButton onClick={onAddProjectClick}>
      <Tab
        myClassName={classes.inactiveTab}
        icon={
          <Tooltip open={hasProjects ? undefined : true} arrow={!hasProjects} title='Add project'>
            <AddCircleIcon />
          </Tooltip>
        }
      />
    </TabButton>
  );
};

AddProjectTab.propTypes = {
  trashTabIndex: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  setProjectView: PropTypes.func.isRequired,
  setActiveProject: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  addListSortSection: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  trashTabIndex: getTrashTabIndex(),
  hasProjects: hasProjects()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index)),
  setProjectView: () => dispatch(appSlice.actions.setView(VIEWS.PROJECTS)),
  setActiveProject: id => dispatch(projectsSlice.actions.setActive(id)),
  addProject: id => dispatch(projectsSlice.actions.add(id)),
  addListSortSection: id => dispatch(listsSlice.actions.addSort(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectTab);
