/**
 * src/components/lib/Typography.js
 *
 * Wraps the mui `Typography` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

const MyTypography = ({ align, variant, component, className, children }) => {
  return (
    <Typography variant={variant} className={className} component={component} align={align}>
      {children}
    </Typography>
  );
};

MyTypography.propTypes = {
  align: PropTypes.string,
  variant: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyTypography.defaultProps = {
  component: '',
  className: '',
  align: 'inherit',
  variant: 'body1'
};

export { MyTypography as Typography };
