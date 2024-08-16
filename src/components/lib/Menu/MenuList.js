/**
 * src/components/lib/MenuList.js
 *
 * Wraps the mui `MenuList` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MenuList from '@mui/material/MenuList';

const MyMenuList = ({ children }) => {
  return <MenuList>{children}</MenuList>;
};

MyMenuList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyMenuList as MenuList };
