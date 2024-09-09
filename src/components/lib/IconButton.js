/**
 * src/components/lib/IconButton.js
 *
 * Wraps the mui `IconButton` for customization purposes.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';

const MyIconButton = forwardRef(({
  color = 'default',
  disabled = false,
  onClick = () => {},
  children,
  ariaLabel = '',
  ...otherProps
}, ref) => {
  return (
    <IconButton
      ref={ref}
      size='small'
      color={color}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...otherProps}
    >
      {children}
    </IconButton>
  );
});

MyIconButton.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children:  PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  ariaLabel: PropTypes.string
};

export { MyIconButton as IconButton };
