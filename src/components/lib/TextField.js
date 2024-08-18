/**
 * src/components/lib/TextField.js
 *
 * Wraps the mui `TextField` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import TextField from '@mui/material/TextField';

import { COLORS } from '@jss/constants';

import { TYPES } from '@src/constants';

const classNames = require('classnames');

const useStyles = createUseStyles({
  hidden: {
    visibility: 'hidden',
    display: 'none !important'
  }
});

const styles = {
  background: {
    '& .MuiOutlinedInput-root': {
      background: COLORS[TYPES.TODO].BACKGROUND_TEXT_FIELD
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

const MyTextField = ({
  id,
  onChange,
  onKeyDown,
  value,
  label,
  type,
  itemType,
  ariaLabel,
  isHidden,
  myClassName
}) => {
  const classes = useStyles();

  return (
    <TextField
      size='small'
      autoFocus
      fullWidth
      id={id}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      label={label}
      aria-label={ariaLabel}
      className={classNames({ [classes.hidden]: isHidden, [myClassName]: !!myClassName })}
      type={type}
      sx={{ ...styles.background, ...styles[TYPE_TO_STYLES[itemType]] }}
    />
  );
};

MyTextField.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  itemType: PropTypes.oneOf([TYPES.TODO, TYPES.LIST, TYPES.PROJECT]),
  ariaLabel: PropTypes.string,
  isHidden: PropTypes.bool,
  myClassName: PropTypes.string
};

MyTextField.defaultProps = {
  id: '',
  onChange: () => {},
  onKeyDown: () => {},
  value: '',
  label: '',
  type: 'text',
  itemType: TYPES.LIST,
  ariaLabel: '',
  isHidden: false,
  myClassName: ''
};

export { MyTextField as TextField };
