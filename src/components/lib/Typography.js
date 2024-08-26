/**
 * src/components/lib/Typography.js
 *
 * Wraps the mui `Typography` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

import { theme, shouldContrast, COLOR_OPTIONS } from '@src/theme';

const MyTypography = ({
  id,
  align,
  variant,
  gutterBottom,
  component,
  color,
  className,
  children
}) => {
  return (
    <Typography
      id={`text-${id}`}
      variant={variant}
      gutterBottom={gutterBottom}
      className={className}
      component={component}
      align={align}
      sx={{
        color: shouldContrast(color) ? 'contrastText' : COLOR_OPTIONS.PRIMARY
      }}
    >
      {children}
    </Typography>
  );
};

MyTypography.propTypes = {
  id: PropTypes.string,
  align: PropTypes.string,
  variant: PropTypes.string,
  gutterBottom: PropTypes.bool,
  component: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

MyTypography.defaultProps = {
  id: '',
  component: '',
  className: '',
  align: 'inherit',
  variant: 'body1',
  color: 'primary',
  gutterBottom: false
};

export { MyTypography as Typography };
