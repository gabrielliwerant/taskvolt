import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { isEmpty } from 'lodash';

import { TODO_INPUT_WIDTH } from '@jss/constants';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active: {
    display: 'inline-flex',

    '&:focus': {
      outline: 'none'
    }
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
    cursor: 'pointer',
    border: 'none',
    height: '16px',
    width: `${TODO_INPUT_WIDTH}px`
  },
  text: {
    fontSize: '14px'
  }
});

const NameInput = ({
  isActive,
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
        [classes.active]: isActive,
        [classes.inactive]: !isActive,
        [classes.complete]: isComplete,
        [classes.incomplete]: !isComplete,
        [classes.item]: true
      })}
    />
  );
};

NameInput.propTypes = {
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  myClassNames: PropTypes.object
};

NameInput.defaultProps = {
  isActive: false,
  isComplete: false,
  onClick: () => {},
  onChange: () => {},
  value: '',
  myClassNames: {}
};

export default NameInput;
