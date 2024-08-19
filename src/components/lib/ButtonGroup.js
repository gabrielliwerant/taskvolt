/**
 * src/components/lib/ButtonGroup.js
 *
 * Wraps the mui `ButtonGroup` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from '@mui/material/ButtonGroup';
import ToolBar from '@mui/material/ToolBar';

const MyButtonGroup = ({ orientation, variant, size, color, children }) => {
  return (
    <ButtonGroup
      disableElevation
      orientation={orientation}
      variant={variant}
      size={size}
      color={color}
    >
      {children}
    </ButtonGroup>
  );
};

MyButtonGroup.propTypes = {
  orientation: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyButtonGroup.defaultProps = {
  orientation: 'horizontal',
  variant: 'contained',
  size: 'medium',
  color: 'primary'
};

export { MyButtonGroup as ButtonGroup };
