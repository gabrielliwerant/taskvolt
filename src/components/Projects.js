/**
 * src/components/Projects.js
 *
 * Renders the projects section.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Tabs } from '@components/lib/Tab';
import ProjectTab from '@components/ProjectTab';

import { getProjectsSort } from '@redux/selectors/projects';


const Projects = ({ projectsSort, addList }) => {
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
    </Tabs>
  );
};

Projects.propTypes = {
  projectsSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort()
});

export default connect(mapStateToProps, null)(Projects);
