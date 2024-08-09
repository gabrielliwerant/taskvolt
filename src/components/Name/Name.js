/**
 * src/components/Name/Name.js
 *
 * Renders the name of a given item in various states.
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
  item: {
    ...item,

    cursor: 'pointer'
  },
  text
});

const Name = ({ isActive, isComplete, onClick, value, type, myClassNames }) => {
  const classes = useStyles({ type });
  const myClasses = Object.values(myClassNames).join(' ');

  return (
    <div
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
    >
      {value}
    </div>
  );
};

Name.propTypes = {
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.oneOf([ TYPES.TODO, TYPES.LIST ]),
  myClassNames: PropTypes.object
};

Name.defaultProps = {
  isActive: false,
  isComplete: false,
  onClick: () => {},
  value: '',
  type: TYPES.TODO,
  myClassNames: {}
};

export default Name;
