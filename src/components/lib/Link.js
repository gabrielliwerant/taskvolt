/**
 * src/components/lib/Link.js
 *
 * Wraps the mui `Link` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Link from '@mui/material/Link';

import { COLOR_OPTIONS, theme } from '@src/theme';

const classNames = require('classnames');

// Map our color options to to display color for links
const COLOR_OPTION_TO_COLOR = {
  [COLOR_OPTIONS.PRIMARY]: COLOR_OPTIONS.PRIMARY,
  [COLOR_OPTIONS.SECONDARY]: theme.palette.contrastText,
  [COLOR_OPTIONS.ERROR]: theme.palette.contrastText,
  [COLOR_OPTIONS.WARNING]: COLOR_OPTIONS.SECONDARY,
  [COLOR_OPTIONS.SUCCESS]: theme.palette.contrastText,
  [COLOR_OPTIONS.INFO]: theme.palette.contrastText,
  [COLOR_OPTIONS.WHITE]: theme.palette.contrastText,
  [COLOR_OPTIONS.BLACK]: theme.palette.contrastText
};

const useStyles = createUseStyles({
  link: {
    lineHeight: '1.5 !important',
    display: 'inline-flex'
  },
  complete: {
    textDecoration: 'line-through !important'
  }
});

const MyLink = ({ variant = '', href = '', color = 'primary', isComplete = false, children }) => {
  const classes = useStyles();

  return (
    <Link
      className={classNames({ [classes.link]: true, [classes.complete]: isComplete })}
      variant={variant}
      href={href}
      target='_blank'
      color={COLOR_OPTION_TO_COLOR[color]}
    >
      <span>{children}</span>
    </Link>
  );
};

MyLink.propTypes = {
  variant: PropTypes.string,
  href: PropTypes.string,
  color: PropTypes.oneOf([
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY,
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.WHITE,
    COLOR_OPTIONS.BLACK
  ]),
  isComplete: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export { MyLink as Link };
