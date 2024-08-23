/**
 * src/components/lib/AppBar.js
 *
 * Wraps the mui `AppBar` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';

const MyAppBar = ({ color, position, component, isTop, children, myClassName }) => {
  return (
    <AppBar
      component={component}
      position={position}
      color={color}
      sx={{ top: isTop ? 0 : 'auto', bottom: isTop ? 'auto' : 0 }}
    >
      <ToolBar className={myClassName}>{children}</ToolBar>
    </AppBar>
  );
};

MyAppBar.propTypes = {
  color: PropTypes.string,
  component: PropTypes.string,
  position: PropTypes.string,
  isTop: PropTypes.bool,
  children: PropTypes.element.isRequired,
  myClassName: PropTypes.string
};

MyAppBar.defaultProps = {
  color: 'primary',
  component: 'header',
  position: 'relative',
  isTop: true,
  myClassName: ''
};

export { MyAppBar as AppBar };
