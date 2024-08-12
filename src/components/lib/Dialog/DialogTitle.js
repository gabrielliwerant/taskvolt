/**
 * src/components/lib/DialogTitle.js
 *
 * Wraps the mui `DialogTitle` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';

const MyDialogTitle = ({ children }) => {
  return <DialogTitle>{children}</DialogTitle>;
};

MyDialogTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyDialogTitle as DialogTitle };
