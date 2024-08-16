/**
 * src/components/lib/MenuItem.js
 *
 * Wraps the mui `MenuItem` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';

const MyMenuItem = ({ onClick, children }) => {
  return <MenuItem onClick={onClick}>{children}</MenuItem>;
};

MyMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyMenuItem as MenuItem };
