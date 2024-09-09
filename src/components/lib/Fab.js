/**
 * src/components/lib/Fab.js
 *
 * Wraps the mui `Fab` for customization purposes.
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Fab from '@mui/material/Fab';

const MyFab = forwardRef(({
  size = 'small',
  color = 'primary',
  onClick,
  children,
  myClassName = '',
  ...otherProps
}, ref) => {
  return (
    <Fab
      ref={ref}
      size={size}
      color={color}
      onClick={onClick}
      classes={{ root: myClassName }}
      {...otherProps}
    >
      {children}
    </Fab>
  );
});

MyFab.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  myClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyFab as Fab };
