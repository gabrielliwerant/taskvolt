/**
 * src/components/lib/Typography.js
 *
 * Wraps the mui `Typography` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

const MyTypography = ({ align, variant, gutterBottom, component, className, children }) => {
  return (
    <Typography
      variant={variant}
      gutterBottom={gutterBottom}
      className={className}
      component={component}
      align={align}
    >
      {children}
    </Typography>
  );
};

MyTypography.propTypes = {
  align: PropTypes.string,
  variant: PropTypes.string,
  gutterBottom: PropTypes.bool,
  component: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyTypography.defaultProps = {
  component: '',
  className: '',
  align: 'inherit',
  variant: 'body1',
  gutterBottom: false
};

export { MyTypography as Typography };
