/**
 * src/components/lib/CircularProgress.js
 *
 * Wraps the mui `CircularProgress` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';

const classNames = require('classnames');

const MyCircularProgress = ({ size, myClassName }) => {
  return <CircularProgress size={size} className={classNames({ [myClassName]: !!myClassName })} />;
};

MyCircularProgress.propTypes = {
  size: PropTypes.number.isRequired,
  myClassName: PropTypes.string
};

MyCircularProgress.defaultProps = {
  size: 16,
  myClassName: ''
};

export { MyCircularProgress as CircularProgress };
