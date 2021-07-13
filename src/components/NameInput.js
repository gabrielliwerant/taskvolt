import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { isEmpty } from 'lodash';

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
    '&:focus': {
      outline: 'none'
    }
  },
  text: {
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: '14px'
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
  const myClasses = Object.values(myClassNames).join(' ');

  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      onClick={onClick}
      className={classNames({
        [myClasses]: !isEmpty(myClassNames),
        [classes.text]: !myClassNames?.text,
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
  myClassNames: PropTypes.object
};

NameInput.defaultProps = {
  isEditActive: false,
  isComplete: false,
  onClick: () => {},
  onChange: () => {},
  value: '',
  myClassNames: {}
};

export default NameInput;
