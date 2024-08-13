/**
 * src/components/lib/TextField.js
 *
 * Wraps the mui `TextField` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';

import { TYPES } from '@src/constants';

const styles = {
  background: {
    '& .MuiOutlinedInput-root': {
      background: '#FFFFFF'
    }
  },
  todo: {
    '& .MuiInputBase-input': { padding: '5px 12px 6px' }
  },
  list: {},
  project: {}
};

const TYPE_TO_STYLES = {
  [TYPES.TODO]: 'todo',
  [TYPES.LIST]: 'list',
  [TYPES.PROJECT]: 'project'
};

const MyTextField = ({ onChange, value, type, ariaLabel, myClassName }) => {
  return (
    <TextField
      size='small'
      autoFocus
      fullWidth
      onChange={onChange}
      value={value}
      aria-label={ariaLabel}
      className={myClassName}
      sx={{ ...styles.background, ...styles[TYPE_TO_STYLES[type]] }}
    />
  );
};

MyTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TYPES.TODO, TYPES.LIST, TYPES.PROJECT]).isRequired,
  ariaLabel: PropTypes.string,
  myClassName: PropTypes.string
};

MyTextField.defaultProps = {
  type: TYPES.LIST,
  ariaLabel: '',
  myClassName: ''
};

export { MyTextField as TextField };
