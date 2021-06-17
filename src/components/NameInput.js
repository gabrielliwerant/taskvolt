import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
const classNames = require('classnames');

const useStyles = createUseStyles({
  active: {
    display: 'inline-flex'
  },
  inactive: {
    display: 'none'
  },
  complete: {
    textDecoration: 'line-through',
    opacity: '0.5'
  },
  incomplete: {
    textDecoration: 'none'
  },
  item: {
    background: 'transparent',
    cursor: 'text',
    border: 'none',
    height: '16px',
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: '14px',
    '&:focus': {
      outline: 'none'
    }
  }
});

const NameInput = ({
  isEditActive,
  isComplete,
  onClick,
  onChange,
  value,
  myClassNames
}) => {
  const classes = useStyles();

  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      onClick={onClick}
      className={classNames({
        [myClassNames]: myClassNames,
        [classes.active]: !isEditActive,
        [classes.inactive]: isEditActive,
        [classes.complete]: isComplete,
        [classes.incomplete]: !isComplete,
        [classes.item]: true
      })}
    />
  );
};

NameInput.propTypes = {
  isEditActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  myClassNames: PropTypes.string
};

NameInput.defaultProps = {
  isEditActive: false,
  isComplete: false,
  onClick: () => {},
  onChange: () => {},
  value: '',
  myClassNames: ''
};

export default NameInput;
