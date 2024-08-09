/**
 * src/components/lib/IconButton.js
 *
 * Wraps the mui `IconButton` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';

const MyIconButton = ({ onClick, children, ariaLabel }) => {
  return <IconButton size='small' onClick={onClick} aria-label={ariaLabel}>{children}</IconButton>;
};

MyIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  ariaLabel: PropTypes.string
};

MyIconButton.defaultProps = {
  ariaLabel: ''
};

export { MyIconButton as IconButton };
