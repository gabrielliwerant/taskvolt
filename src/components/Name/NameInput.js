/**
 * src/components/Name/NameInput.js
 *
 * Renders the name input field of a given item for editing.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { isEmpty } from 'lodash';

import { TYPES } from '@src/constants';

import { active, inactive, complete, incomplete, item, text } from './styles';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active,
  inactive,
  complete,
  incomplete,
  item,
  text
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
