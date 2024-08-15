/**
 * src/components/lib/AppBar.js
 *
 * Wraps the mui `AppBar` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';

const MyAppBar = ({ color, position, component, children, myClassName }) => {
  return (
    <AppBar component={component} position={position} color={color}>
      <ToolBar className={myClassName}>{children}</ToolBar>
    </AppBar>
  );
};

MyAppBar.propTypes = {
  color: PropTypes.string,
  component: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.element.isRequired,
  myClassName: PropTypes.string
};

MyAppBar.defaultProps = {
  color: 'primary',
  component: 'header',
  position: 'relative',
  myClassName: ''
};

export { MyAppBar as AppBar };
