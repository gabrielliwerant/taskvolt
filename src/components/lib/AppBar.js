/**
 * src/components/lib/AppBar.js
 *
 * Wraps the mui `AppBar` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';

const MyAppBar = ({
  color = 'primary',
  position = 'relative',
  component = 'header',
  isTop = true,
  children,
  myClassNameAppBar = '',
  myClassNameToolbar = ''
}) => {
  return (
    <AppBar
      component={component}
      position={position}
      color={color}
      sx={{ top: isTop ? 0 : 'auto', bottom: isTop ? 'auto' : 0 }}
      className={myClassNameAppBar}
    >
      <ToolBar className={myClassNameToolbar}>{children}</ToolBar>
    </AppBar>
  );
};

MyAppBar.propTypes = {
  color: PropTypes.string,
  component: PropTypes.string,
  position: PropTypes.string,
  isTop: PropTypes.bool,
  children: PropTypes.element.isRequired,
  myClassNameAppBar: PropTypes.string,
  myClassNameToolbar: PropTypes.string
};

export { MyAppBar as AppBar };
