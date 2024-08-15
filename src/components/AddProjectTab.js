/**
 * src/components/AddProjectTab.js
 *
 * Renders the tab that allows us to add new projects.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import AddCircleIcon from '@mui/icons-material/AddCircleRounded';

import { Tooltip } from '@components/lib/Tooltip';
import { Tab } from '@components/lib/Tab';

import { flex } from '@jss/styles';

import { makeId } from '@src/utils';
import { VIEWS } from '@main/constants';
import { getAppView } from '@redux/selectors/app';
import { getTrashTabIndex } from '@redux/selectors/projects';
import { listsSlice } from '@redux/reducers/lists';
import { projectsSlice } from '@redux/reducers/projects';
import { appSlice } from '@redux/reducers/app';

const useStyles = createUseStyles({
  flex
});

const AddProjectTab = ({ view, trashTabIndex, setActiveTab, addProject, addListSortSection }) => {
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
    
    if (view === VIEWS.TRASH) setActiveTab(trashTabIndex + 1); // Keep `trash` tab active
  };

  return (
    <div role="button" onClick={onAddProjectClick} className={classes.flex}>
      <Tab icon={<Tooltip title='Add project'><AddCircleIcon /></Tooltip>} />
    </div>
  );
};

AddProjectTab.propTypes = {
  view: PropTypes.oneOf([VIEWS.PROJECTS, VIEWS.TRASH]).isRequired,
  trashTabIndex: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  addListSortSection: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  view: getAppView(),
  trashTabIndex: getTrashTabIndex()
});

const mapDispatchToProps = dispatch => ({
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index)),
  addProject: id => dispatch(projectsSlice.actions.add(id)),
  addListSortSection: id => dispatch(listsSlice.actions.addSort(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectTab);
