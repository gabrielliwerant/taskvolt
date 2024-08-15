/**
 * src/components/lib/Button.js
 *
 * Wraps the mui `Button` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

const MyButton = ({ onClick, variant, color, startIcon, children }) => {
  return (
    <Button variant={variant} onClick={onClick} color={color} startIcon={startIcon}>
      {children}
    </Button>
  );
};

MyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  startIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
  startIcon: ''
};

export { MyButton as Button };
