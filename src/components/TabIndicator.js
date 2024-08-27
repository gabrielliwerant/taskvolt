/**
 * src/components/TabIndicator.js
 *
 * Creates a tab indicator, similar to the one used by material ui, which is used to distinguish
 * active tabs fron inactive tabs.
 *
 * We use our own version of the indicator instead of the `Tabs` component because the `Tabs`
 * component is opinionated in its display, and does not play well with `react-beautiful-dnd`.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { theme } from '@src/theme';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active: {
    width: '100%'
  },
  inactive: {
    width: '0%'
  },
  tabIndicator: {
    position: 'absolute',
    height: '2px',
    bottom: 0,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: theme.palette.primary.main
  }
});

const TabIndicator = ({ isActive }) => {
  const classes = useStyles();

  return (
    <div
      className={classNames({
        [classes.tabIndicator]: true,
        [classes.active]: isActive,
        [classes.inactive]: !isActive
      })}
    />
  );
};

TabIndicator.propTypes = {
  isActive: PropTypes.bool
};

TabIndicator.defaultProps = {
  isActive: false
};

export default TabIndicator;
