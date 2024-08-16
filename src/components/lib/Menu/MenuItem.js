/**
 * src/components/lib/MenuItem.js
 *
 * Wraps the mui `MenuItem` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';

const MyMenuItem = ({ children }) => {
  return <MenuItem>{children}</MenuItem>;
};

MyMenuItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyMenuItem as MenuItem };
