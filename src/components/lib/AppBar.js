/**
 * src/components/lib/AppBar.js
 *
 * Wraps the mui `AppBar` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';

const MyAppBar = ({ color, children, myClassName }) => {
  return <AppBar color={color}><ToolBar className={myClassName}>{children}</ToolBar></AppBar>;
};

MyAppBar.propTypes = {
  color: PropTypes.string,
  children: PropTypes.element.isRequired,
  myClassName: PropTypes.string
};

MyAppBar.defaultProps = {
  color: 'primary',
  myClassName: ''
};

export { MyAppBar as AppBar };
