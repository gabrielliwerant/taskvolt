/**
 * src/components/lib/MenuItem.js
 *
 * Wraps the mui `MenuItem` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const MyMenuItem = ({ onClick, icon, children }) => {
  return (
    <MenuItem onClick={onClick}>
      {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  );
};

MyMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyMenuItem.defaultProps = {
  icon: ''
};

export { MyMenuItem as MenuItem };
