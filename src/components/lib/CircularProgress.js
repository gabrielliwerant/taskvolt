/**
 * src/components/lib/CircularProgress.js
 *
 * Wraps the mui `CircularProgress` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';

const classNames = require('classnames');

const MyCircularProgress = ({ size = 16, myClassName = '' }) => {
  return <CircularProgress size={size} className={classNames({ [myClassName]: !!myClassName })} />;
};

MyCircularProgress.propTypes = {
  size: PropTypes.number.isRequired,
  myClassName: PropTypes.string
};

export { MyCircularProgress as CircularProgress };
