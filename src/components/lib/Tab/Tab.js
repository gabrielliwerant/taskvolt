/**
 * src/components/lib/Tab.js
 *
 * Wraps the mui `Tab` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Tab from '@mui/material/Tab';

const useStyles = createUseStyles({
  tab: {
    opacity: '1'
  }
});

const MyTab = ({ label, iconPosition, icon }) => {
  const classes = useStyles();

  return (
    <Tab
      disableRipple
      variant='contained'
      label={label}
      iconPosition={iconPosition}
      icon={icon}
      className={classes.tab}
      component='div'
    />
  );
};

MyTab.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconPosition: PropTypes.string,
  icon: PropTypes.node
};

MyTab.defaultProps = {
  label: '',
  iconPosition: 'end',
  icon: ''
};

export { MyTab as Tab };
