/**
 * src/components/lib/DialogContentText.js
 *
 * Wraps the mui `DialogContentText` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import DialogContentText from '@mui/material/DialogContentText';

const MyDialogContentText = ({ children }) => {
  return <DialogContentText>{children}</DialogContentText>;
};

MyDialogContentText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyDialogContentText as DialogContentText };
