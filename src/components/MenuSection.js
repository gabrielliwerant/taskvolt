/**
 * src/components/MenuSection.js
 *
 * Renders a typical menu section which includes a `Menu` and `IconButton` for opening it.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@components/lib/IconButton';
import { Menu } from '@components/lib/Menu';

const MenuSection = ({ icon, ariaLabel, children }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = !!menuAnchorEl;

  /**
   * Handle menu icon click by setting the anchor element for menu display, which in turn sets the
   * open boolean.
   *
   * @returns {void}
   */
  const onMenuClick = e => setMenuAnchorEl(e.currentTarget);

  /**
   * Handle menu close by resetting the anchor element.
   *
   * @returns {void}
   */
  const onMenuClose = () => setMenuAnchorEl(null);

  return (
    <Fragment>
      <IconButton color='inherit' onClick={onMenuClick} ariaLabel={ariaLabel}>
        {icon}
      </IconButton>
      <Menu open={isMenuOpen} onClose={onMenuClose} anchorEl={menuAnchorEl}>
        {children}
      </Menu>
    </Fragment>
  );
};

MenuSection.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MenuSection.defaultProps = {
  ariaLabel: ''
};

export default MenuSection;
