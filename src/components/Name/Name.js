/**
 * src/components/Name/Name.js
 *
 * Renders the name of a given item in various states.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { isEmpty } from 'lodash';

import { Typography } from '@components/lib/Typography';

import { TYPES, TYPE_TO_TYPOGRAPHY_VARIANT } from '@src/constants';

import { complete } from '@components/styles';
import { active, inactive, incomplete, item, text } from '@components/Name/styles';

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

const Name = ({
  id = '',
  isActive = false,
  isComplete = false,
  onClick = () => {},
  value = '',
  type = TYPES.TODO,
  color = 'primary',
  myClassNames = {}
}) => {
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
      <Typography id={id} variant={TYPE_TO_TYPOGRAPHY_VARIANT[type]} color={color}>
        {value}
      </Typography>
    </div>
  );
};

Name.propTypes = {
  id: PropTypes.string,
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf([ TYPES.TODO, TYPES.LIST, TYPES.PROJECT ]),
  myClassNames: PropTypes.object
};

export default Name;
