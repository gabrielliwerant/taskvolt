/**
 * src/components/Projects.js
 *
 * Renders the projects section.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddRounded from '@mui/icons-material/AddRounded';

import { Tab, Tabs } from '@components/lib/Tab';
import { IconButton } from '@components/lib/IconButton';
import ProjectTab from '@components/ProjectTab';

import { getProjectsSort } from '@redux/selectors/projects';
import { projectsSlice } from '@redux/reducers/projects';


const Projects = ({ projectsSort, addProject }) => {
  const [value, setValue] = useState(0);

  /**
   * Handles tab change action.
   *
   * @param {object} e Event
   * @param {integer} newValue New tab value index
   * @returns {void}
   */
  const onChange = (e, newValue) => setValue(newValue);

  return (
    <Tabs value={value} onChange={onChange}>
      {projectsSort['1'].map(id => <ProjectTab key={id} id={id} />)}
      <Tab
        icon={
          <IconButton onClick={addProject} ariaLabel='Add project'>
            <AddRounded fontSize='small' />
          </IconButton>
        }
      />
    </Tabs>
  );
};

Projects.propTypes = {
  projectsSort: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort()
});

const mapDispatchToProps = dispatch => ({
  addProject: () => dispatch(projectsSlice.actions.add())
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
