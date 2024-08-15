/**
 * src/components/lib/Tooltip.js
 *
 * Wraps the mui `Tooltip` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';

const classNames = require('classnames');

const MyTooltip = ({ title, children, myClassName }) => {
  return (
    <Tooltip title={title} classes={{ popper: myClassName }}>
      {children}
    </Tooltip>
  );
};

MyTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  myClassName: PropTypes.string
};

MyTooltip.defaultProps = {
  myClassName: ''
};

export { MyTooltip as Tooltip };
