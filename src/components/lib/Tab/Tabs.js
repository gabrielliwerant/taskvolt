/**
 * src/components/lib/Tabs.js
 *
 * Wraps the mui `Tabs` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';

const MyTabs = ({ value, children }) => {
  return <Tabs variant='scrollable' value={value}>{children}</Tabs>;
};

MyTabs.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyTabs as Tabs };
