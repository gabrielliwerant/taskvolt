/**
 * src/components/lib/MenuItem.js
 *
 * Wraps the mui `MenuItem` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const classNames = require('classnames');

const useStyles = createUseStyles({
  defaultCursor: {
    cursor: 'default !important'
  }
});

const MyMenuItem = ({
  onClick = () => {},
  icon = '',
  disableRipple = false,
  disablePointer = false,
  children = ''
}) => {
  const classes = useStyles();

  return (
    <MenuItem
      onClick={onClick}
      disableRipple={disableRipple}
      className={classNames({ [classes.defaultCursor]: disablePointer })}
    >
      {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  );
};

MyMenuItem.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  disableRipple: PropTypes.bool,
  disablePointer: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
};

export { MyMenuItem as MenuItem };
