/**
 * src/components/lib/Dialog.js
 *
 * Wraps the mui `Dialog` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';

const MyDialog = ({ open, onClose, maxWidth = 'xs', children }) => {
  return <Dialog maxWidth={maxWidth} open={open} onClose={onClose}>{children}</Dialog>;
};

MyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  maxWidth: PropTypes.string,
  children: PropTypes.element.isRequired
};

export { MyDialog as Dialog };
