/**
 * src/components/TabButton.js
 *
 * Creates a button-like element intended to surround a tab to provide additional click
 * functionality to that tab, as well as some visual consistency.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { flexCenterY } from '@jss/styles';
import { HEIGHTS } from '@jss/constants';

import { TYPES } from '@src/constants';

const useStyles = createUseStyles({
  tabBtn: {
    ...flexCenterY,

    height: `${HEIGHTS[TYPES.PROJECT].MAIN}px`
  }
});

const TabButton = ({ onClick, children }) => {
  const classes = useStyles();

  return <div role="button" onClick={onClick} className={classes.tabBtn}>{children}</div>;
};

TabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default TabButton;
