import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const classNames = require('classnames');

const useStyles = createUseStyles({
  todo: {
    fontSize: '14px'
  },
  list: {
    fontSize: '1.25rem'
  },
  project: {
    fontSize: '1.5rem'
  }
});

const Typography = ({ variant, children }) => {
  const classes = useStyles();

  return (
    <span
      className={classNames({
        [classes.todo]: variant === 'todo',
        [classes.list]: variant === 'list',
        [classes.project]: variant === 'project'
      })}
    >
      {children}
    </span>
  );
};

Typography.propTypes = {
  variant: PropTypes.string
};

Typography.defaultProps = {
  variant: 'todo'
};

export default Typography;
