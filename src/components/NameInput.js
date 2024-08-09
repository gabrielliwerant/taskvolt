import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { isEmpty } from 'lodash';

import { TYPES } from '@src/constants';

import { WIDTHS, HEIGHTS } from '@jss/constants';

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
    height: props => `${HEIGHTS[props.type].INPUT}px`,
    width: props => `${WIDTHS[props.type].INPUT}px`
  },
  text: {
    fontSize: '14px'
  }
});

const NameInput = ({
  isActive,
  isComplete,
  onChange,
  value,
  type,
  myClassNames
}) => {
  const classes = useStyles({ type });
  const myClasses = Object.values(myClassNames).join(' ');

  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
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
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.oneOf([ TYPES.TODO, TYPES.LIST ]),
  myClassNames: PropTypes.object
};

NameInput.defaultProps = {
  isActive: false,
  isComplete: false,
  onChange: () => {},
  value: '',
  type: TYPES.TODO,
  myClassNames: {}
};

export default NameInput;
