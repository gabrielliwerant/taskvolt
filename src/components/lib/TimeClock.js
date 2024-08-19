/**
 * src/components/lib/TimeClock.js
 *
 * Wraps the mui `TimeClock` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

const MyTimeClock = ({ value, view, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeClock disablePast ampm value={value} view={view} onChange={onChange} />
    </LocalizationProvider>
  );
};

MyTimeClock.propTypes = {
  value: PropTypes.object,
  view: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

MyTimeClock.defaultProps = {
  value: {},
  view: 'hours'
};

export { MyTimeClock as TimeClock };
