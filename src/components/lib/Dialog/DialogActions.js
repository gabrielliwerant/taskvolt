/**
 * src/components/lib/DialogActions.js
 *
 * Wraps the mui `DialogActions` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import DialogActions from '@mui/material/DialogActions';

const MyDialogActions = ({ children, styles = {} }) => {
  return <DialogActions sx={{ ...styles }}>{children}</DialogActions>;
};

MyDialogActions.propTypes = {
  children: PropTypes.element.isRequired,
  styles: PropTypes.object
};

export { MyDialogActions as DialogActions };
