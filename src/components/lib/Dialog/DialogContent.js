/**
 * src/components/lib/DialogContent.js
 *
 * Wraps the mui `DialogContent` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import DialogContent from '@mui/material/DialogContent';

const MyDialogContent = ({ children }) => {
  return <DialogContent>{children}</DialogContent>;
};

MyDialogContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyDialogContent as DialogContent };
