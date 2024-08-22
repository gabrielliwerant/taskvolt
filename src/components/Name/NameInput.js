/**
 * src/components/Name/NameInput.js
 *
 * Renders the name input field of a given item for editing.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { isEmpty } from 'lodash';

import { TextField } from '@components/lib/TextField';
import { Typography } from '@components/lib/Typography';

import { active, inactive, complete, incomplete, item, text } from '@components/Name/styles';

import { TYPES } from '@src/constants';

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
  color,
  isActive,
  isComplete,
  onChange,
  onKeyDown,
  value,
  label,
  type,
  myClassNames
}) => {
  const classes = useStyles({ type });
  const myClasses = Object.values(myClassNames).join(' ');

  return (
    <TextField
      color={color}
      value={value}
      label={label}
      onChange={onChange}
      onKeyDown={onKeyDown}
      itemType={type}
      myClassName={classNames({
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
  color: PropTypes.string,
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf([ TYPES.TODO, TYPES.LIST, TYPES.PROJECT ]),
  myClassNames: PropTypes.object
};

NameInput.defaultProps = {
  color: 'primary',
  isActive: false,
  isComplete: false,
  onChange: () => {},
  onKeyDown: () => {},
  value: '',
  label: '',
  type: TYPES.TODO,
  myClassNames: {}
};

export default NameInput;
