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

const MyTimeClock = ({ value = {}, view = 'hours', onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeClock ampm value={value} view={view} onChange={onChange} />
    </LocalizationProvider>
  );
};

MyTimeClock.propTypes = {
  value: PropTypes.object,
  view: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export { MyTimeClock as TimeClock };
