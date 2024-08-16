/**
 * src/components/lib/IconButton.js
 *
 * Wraps the mui `IconButton` for customization purposes.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';

const MyIconButton = forwardRef(({ color, onClick, children, ariaLabel, ...otherProps }, ref) => {
  return (
    <IconButton
      ref={ref}
      size='small'
      color={color}
      onClick={onClick}
      aria-label={ariaLabel}
      {...otherProps}
    >
      {children}
    </IconButton>
  );
});

MyIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children:  PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  ariaLabel: PropTypes.string
};

MyIconButton.defaultProps = {
  ariaLabel: ''
};

export { MyIconButton as IconButton };
