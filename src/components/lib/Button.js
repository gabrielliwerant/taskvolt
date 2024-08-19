/**
 * src/components/lib/Button.js
 *
 * Wraps the mui `Button` for customization purposes.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

const MyButton = forwardRef(({
  onClick,
  variant,
  size,
  disabled,
  color,
  startIcon,
  children,
  myClassName,
  ...otherProps
}, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      color={color}
      startIcon={startIcon}
      classes={{ root: myClassName }}
      {...otherProps}
    >
      {children}
    </Button>
  );
});

MyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  startIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  myClassName: PropTypes.string
};

MyButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
  size: 'medium',
  disabled: false,
  startIcon: '',
  myClassName: ''
};

export { MyButton as Button };
