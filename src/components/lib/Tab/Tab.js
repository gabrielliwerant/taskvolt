/**
 * src/components/lib/Tab.js
 *
 * Wraps the mui `Tab` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Tab from '@mui/material/Tab';

import { maxContentWidth } from '@jss/styles';

const classNames = require('classnames');

const useStyles = createUseStyles({
  maxContentWidth
});

const MyTab = ({ label = '', iconPosition = 'end', icon = '', myClassName = '' }) => {
  const classes = useStyles();
  
  return (
    <Tab
      disableRipple
      variant='contained'
      label={label}
      iconPosition={iconPosition}
      icon={icon}
      className={classNames({ [classes.maxContentWidth]: true, [myClassName]: !!myClassName })}
      component='div'
    />
  );
};

MyTab.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconPosition: PropTypes.string,
  icon: PropTypes.node,
  myClassName: PropTypes.string
};

export { MyTab as Tab };
