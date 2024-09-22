/**
 * src/components/lib/TextField.js
 *
 * Wraps the mui `TextField` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import TextField from '@mui/material/TextField';

import { theme, shouldContrast, COLOR_OPTIONS } from '@src/theme';

import { TYPES } from '@src/constants';

const classNames = require('classnames');

const useStyles = createUseStyles({
  hidden: {
    visibility: 'hidden',
    display: 'none !important'
  }
});

/**
 * Retrieve the appropriate background override styles based on the color.
 *
 * @param {string} myColor
 * @returns {object} Style object
 */
const getBackgroundStyles = myColor => {
  const background = shouldContrast(myColor) ? theme.palette[myColor].dark : COLOR_OPTIONS.WHITE;

  return { background };
};

/**
 * Retrieve the appropriate border override styles based on the color.
 *
 * @param {string} myColor
 * @returns {object|void} Style object
 */
const getBorderStyles = myColor => {
  if (!shouldContrast(myColor)) return;

  return {
    '& fieldset': {
      borderColor: theme.palette[myColor].dark
    },
    '&:hover fieldset': {
      borderColor: theme.palette.black.main
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette[myColor].main
    }
  };
};

/**
 * Retrieve the appropriate label override styles based on the color.
 *
 * @param {string} myColor
 * @returns {object|void} Style object
 */
const getLabelStyles = myColor => {
  if (myColor === COLOR_OPTIONS.PRIMARY) return;

  const color = shouldContrast(myColor) ? theme.palette.contrastText : theme.palette.black.main;

  return {
    color,

    '&.Mui-focused': {
      color
    }
  };
};

/**
 * Retrieve the appropriate input override styles based on the color.
 *
 * @param {string} myColor
 * @returns {object|void} Style object
 */
const getInputStyles = myColor => {
  if (myColor === COLOR_OPTIONS.PRIMARY) return;

  const color = shouldContrast(myColor) ? theme.palette.contrastText : theme.palette.black.main;

  return { color };
};

/**
 * Retrieve the appropriate item-specific input override styles based on the item type.
 *
 * @param {string} myColor
 * @returns {object|void} Style object
 */
const getItemStyles = type => {
  if (type !== TYPES.TODO) return;

  return {
    padding: '5px 12px 6px'
  };
};

const TYPE_TO_STYLES = {
  [TYPES.TODO]: 'todo',
  [TYPES.LIST]: 'list',
  [TYPES.PROJECT]: 'project'
};

const MyTextField = ({
  id = '',
  onFocus = () => {},
  onChange = () => {},
  onKeyDown = () => {},
  value = '',
  label = '',
  color = 'primary',
  type = 'text',
  itemType = TYPES.LIST,
  ariaLabel = '',
  isHidden = false,
  myClassName = ''
}) => {
  const classes = useStyles();

  return (
    <TextField
      size='small'
      autoFocus
      fullWidth
      id={id}
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      label={label}
      color={color}
      aria-label={ariaLabel}
      className={classNames({ [classes.hidden]: isHidden, [myClassName]: !!myClassName })}
      type={type}
      sx={{
        '& .MuiOutlinedInput-root': {
          ...getBackgroundStyles(color),
          ...getBorderStyles(color)
        },
        '& .MuiInputLabel-root': {
          ...getLabelStyles(color)
        },
        input: {
          ...getInputStyles(color),
          ...getItemStyles(itemType)
        }
      }}
    />
  );
};

MyTextField.propTypes = {
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  itemType: PropTypes.oneOf([TYPES.TODO, TYPES.LIST, TYPES.PROJECT]),
  ariaLabel: PropTypes.string,
  isHidden: PropTypes.bool,
  myClassName: PropTypes.string
};

export { MyTextField as TextField };
