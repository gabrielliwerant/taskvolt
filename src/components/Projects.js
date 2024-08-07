import React from 'react';
import PropTypes from 'prop-types';
// import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { getProjectsSort } from '../redux/selectors/projects';
import Project from './Project';

// const useStyles = createUseStyles({});

const Projects = ({ projectsSort }) => {
  // const classes = useStyles();

  return (
    <ul>
      {projectsSort['1'].map(projectId => (
        <Project key={projectId} id={projectId} />
      ))}
    </ul>
  );
};

Projects.propTypes = {
  projectsSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort()
});

export default connect(mapStateToProps, null)(Projects);
