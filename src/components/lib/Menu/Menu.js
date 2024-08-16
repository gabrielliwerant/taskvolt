/**
 * src/components/lib/Menu.js
 *
 * Wraps the mui `Menu` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@mui/material/Menu';

const MyMenu = ({ open, onClose, anchorEl, children }) => {
  return (
    <Menu open={open} onClose={onClose} anchorEl={anchorEl}>
      {children}
    </Menu>
  );
};

MyMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyMenu.defaultProps = {
  anchorEl: null
};

export { MyMenu as Menu };
