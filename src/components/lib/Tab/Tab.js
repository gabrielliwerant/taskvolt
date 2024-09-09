/**
 * src/components/lib/Tab.js
 *
 * Wraps the mui `Tab` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';

const classNames = require('classnames');

const MyTab = ({ label = '', iconPosition = 'end', icon = '', myClassName = '' }) => {
  return (
    <Tab
      disableRipple
      variant='contained'
      label={label}
      iconPosition={iconPosition}
      icon={icon}
      className={classNames({ [myClassName]: !!myClassName })}
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
