/**
 * src/components/MessageLarge.js
 *
 * Handles reusable large message display for friendly user instructions.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { Typography } from '@components/lib/Typography';

import { TOP_OFFSET } from '@jss/constants';

const useStyles = createUseStyles({
  largeMessage: {
    marginTop: `${TOP_OFFSET * 2}px`,
    opacity: '0.5'
  }
});

const MessageLarge = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.largeMessage}>
      <Typography align='center' variant='h2'>{children}</Typography>
    </div>
  );
};

MessageLarge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default MessageLarge;
