/**
 * src/components/lib/DialogActions.js
 *
 * Wraps the mui `DialogActions` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import DialogActions from '@mui/material/DialogActions';

const MyDialogActions = ({ children }) => {
  return <DialogActions>{children}</DialogActions>;
};

MyDialogActions.propTypes = {
  children: PropTypes.element.isRequired
};

export { MyDialogActions as DialogActions };
