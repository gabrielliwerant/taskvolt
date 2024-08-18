/**
 * src/components/lib/DateCalendar.js
 *
 * Wraps the mui `DateCalendar` for customization purposes.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@components/lib/Dialog';
import { Button } from '@components/lib/Button';
import { Typography } from '@components/lib/Typography';

import { getUnixTimestampFromDate, getDateFromUnixTimestamp, getDateFormatted } from '@src/utils';
import { DATE_FORMAT } from '@src/constants';

/**
 * Helps set the initial date from a given value;
 *
 * @param {number|null} myValue Unix timestamp
 * @returns {object|null}
 */
const setInitialDate = myValue => myValue ? getDateFromUnixTimestamp(myValue) : null;

const MyDateCalendar = ({ onConfirm, onClose, isOpen, value }) => {
  const [displayDate, setDisplayDate] = useState(getDateFormatted());
  const [chosenDate, setChosenDate] = useState(setInitialDate(value));

  /**
   * Handle update to display and saving data to state when we select new dates.
   *
   * @param {object} value Date object
   * @returns {void}
   */
  const onDateChange = value => {
    setDisplayDate(getDateFormatted(value));
    setChosenDate(value);
  };

  /**
   * Handle dialog confirmation by saving chosen date.
   *
   * @returns {void}
   */
  const onDateConfirm = () => {
    const myDate = chosenDate ? getUnixTimestampFromDate(chosenDate) : null;

    onConfirm(myDate);
  };

  /**
   * Handle dialog close action.
   *
   * @returns {void}
   */
  const onDateClose = () => {
    setChosenDate(setInitialDate(value));
    onClose();
  };

  /**
   * Handles existing date removal in state.
   *
   * @returns {void}
   */
  const onDateRemove = () => setChosenDate(null);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Fragment>
        <DialogTitle>
          <Typography variant='overline'>Select Date</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='h4' gutterBottom>{displayDate}</Typography>
          <Button onClick={onDateRemove} size='small'>Remove Date</Button>
        </DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={chosenDate} disablePast onChange={onDateChange} />
        </LocalizationProvider>
        <DialogActions>
          <Fragment>
            <Button variant='text' onClick={onDateConfirm}>Confirm</Button>
            <Button variant='text' onClick={onDateClose}>Cancel</Button>
          </Fragment>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
};

MyDateCalendar.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  value: PropTypes.number
};

MyDateCalendar.defaultProps = {
  value: null
};

export { MyDateCalendar as DateCalendar };
