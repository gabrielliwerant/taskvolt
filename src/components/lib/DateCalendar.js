/**
 * src/components/lib/DateCalendar.js
 *
 * Wraps the mui `DateCalendar` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const MyDateCalendar = ({ value = {}, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} disablePast onChange={onChange} />
    </LocalizationProvider>
  );
};

MyDateCalendar.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export { MyDateCalendar as DateCalendar };
