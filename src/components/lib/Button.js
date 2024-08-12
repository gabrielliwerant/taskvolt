/**
 * src/components/lib/Button.js
 *
 * Wraps the mui `Button` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

const MyButton = ({ onClick, color, children }) => {
  return <Button variant="contained" onClick={onClick} color={color}>{children}</Button>;
};

MyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyButton.defaultProps = {
  color: 'primary'
};

export { MyButton };
