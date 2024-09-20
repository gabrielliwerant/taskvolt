/**
 * src/components/Code.js
 *
 * Renders code blocks.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss'

import { COLOR_OPTIONS, ITEM_COLORS } from '@src/theme';
import { TYPES } from '@src/constants';

// Map our color options to to display color for code
const COLOR_OPTION_TO_COLOR = {
  [COLOR_OPTIONS.PRIMARY]: ITEM_COLORS[TYPES.TODO][COLOR_OPTIONS.PRIMARY].BACKGROUND_COMPLETE_HOVER.STOP,
  [COLOR_OPTIONS.SECONDARY]: ITEM_COLORS[TYPES.TODO][COLOR_OPTIONS.SECONDARY].BACKGROUND_COMPLETE_HOVER.STOP,
  [COLOR_OPTIONS.ERROR]: ITEM_COLORS[TYPES.TODO][COLOR_OPTIONS.ERROR].BACKGROUND_COMPLETE_HOVER.STOP,
  [COLOR_OPTIONS.WARNING]: ITEM_COLORS[TYPES.TODO][COLOR_OPTIONS.WARNING].BACKGROUND_COMPLETE_HOVER.STOP,
  [COLOR_OPTIONS.SUCCESS]: ITEM_COLORS[TYPES.TODO][COLOR_OPTIONS.SUCCESS].BACKGROUND_COMPLETE_HOVER.STOP,
  [COLOR_OPTIONS.INFO]: ITEM_COLORS[TYPES.TODO][COLOR_OPTIONS.INFO].BACKGROUND_COMPLETE_HOVER.STOP
};

const useStyles = createUseStyles({
  code: {
    fontSize: '0.75rem',
    background: props => COLOR_OPTION_TO_COLOR[props.color],
    padding: '2px'
  }
});

const Code = ({ color = 'primary', children }) => {
  const classes = useStyles({ color });

  return <code className={classes.code}>{children}</code>;
};

Code.propTypes = {
  color: PropTypes.oneOf([
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY,
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO
  ]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default Code;
