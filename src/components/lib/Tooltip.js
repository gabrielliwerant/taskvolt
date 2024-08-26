/**
 * src/components/lib/Tooltip.js
 *
 * Wraps the mui `Tooltip` for customization purposes.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';

const classNames = require('classnames');

const MyTooltip = ({ title, open, arrow, children, myClassName }) => {
  return (
    <Fragment>
      {open === undefined &&
        <Tooltip title={title} arrow={arrow} classes={{ popper: myClassName }}>
          {children}
        </Tooltip>
      }
      {open !== undefined &&
        <Tooltip title={title} arrow={arrow} open={open} classes={{ popper: myClassName }}>
          {children}
        </Tooltip>
      }
    </Fragment>
  );
};

MyTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  arrow: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  myClassName: PropTypes.string
};

MyTooltip.defaultProps = {
  open: undefined,
  arrow: false,
  myClassName: ''
};

export { MyTooltip as Tooltip };
