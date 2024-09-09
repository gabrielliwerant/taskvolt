/**
 * src/components/DateCalendarModal.js
 *
 * Renders the date calendar modal section for choosing dates and other interactions.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@components/lib/Dialog';
import { Button } from '@components/lib/Button';
import { Typography } from '@components/lib/Typography';
import { DateCalendar } from '@components/lib/DateCalendar';
import { FormControlLabel } from '@components/lib/FormControlLabel';

import { flexCenterX } from '@jss/styles';

import { getUnixTimestampFromDate, getDateFromUnixTimestamp, getDateFormatted } from '@src/utils';

const useStyles = createUseStyles({
  flexCenterX
});

/**
 * Helps set the initial date from a given value;
 *
 * @param {number|null} myValue Unix timestamp
 * @returns {object|null}
 */
const setInitialDate = myValue => myValue ? getDateFromUnixTimestamp(myValue) : null;

const DateCalendarModal = ({
  onConfirm,
  onClose,
  isOpen,
  value = null,
  hasReminder,
  onReminderChange
}) => {
  const classes = useStyles();
  const [displayDate, setDisplayDate] = useState(getDateFormatted());
  const [chosenDate, setChosenDate] = useState(setInitialDate(value));
  const [isReminderChecked, setIsReminderChecked] = useState(hasReminder);
  const [isResetable, setIsResetable] = useState(!!value);

  /**
   * Handle update to display and saving data to state when we select new dates.
   *
   * @param {object} myValue Date object
   * @returns {void}
   */
  const onDateChange = myValue => {
    setDisplayDate(getDateFormatted(myValue));
    setChosenDate(myValue);
    setIsResetable(true);
  };

  /**
   * Handle state changes to the email reminder checkbox.
   *
   * @returns {void}
   */
  const onReminderChangeHandler = () => {
    setIsReminderChecked(!isReminderChecked);
    setIsResetable(true);
  };

  /**
   * Handle dialog confirmation by saving chosen date.
   *
   * @returns {void}
   */
  const onDateConfirm = () => {
    const myDate = chosenDate ? getUnixTimestampFromDate(chosenDate) : null;

    onConfirm(myDate);
    onReminderChange(isReminderChecked);
  };

  /**
   * Handle dialog close action.
   *
   * @returns {void}
   */
  const onDateClose = () => {
    onClose();
    setChosenDate(setInitialDate(value));
    setIsReminderChecked(hasReminder);
    if (!value) setIsResetable(false);
  };

  /**
   * Handles existing date removal in state.
   *
   * @returns {void}
   */
  const onDateRemove = () => {
    setDisplayDate(getDateFormatted());
    setChosenDate(null);
    setIsResetable(false);
    setIsReminderChecked(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Fragment>
        <DialogTitle>
          <Typography variant='overline'>Select Date</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant='h4' gutterBottom>{displayDate}</Typography>
          <div className={classes.flexCenterX}>
            <FormControlLabel
              isDisabled={!chosenDate}
              label='Email reminder'
              isChecked={isReminderChecked}
              onChange={onReminderChangeHandler}
            />
          </div>
        </DialogContent>
        <DateCalendar value={chosenDate} onChange={onDateChange} />
        <DialogActions styles={{ ...flexCenterX }}>
          <Fragment>
            <Button onClick={onDateRemove} size='small' disabled={!isResetable}>Reset</Button>
            <div>
              <Button variant='text' onClick={onDateConfirm}>Confirm</Button>
              <Button variant='text' onClick={onDateClose}>Cancel</Button>
            </div>
          </Fragment>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
};

DateCalendarModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hasReminder: PropTypes.bool.isRequired,
  onReminderChange: PropTypes.func.isRequired,
  value: PropTypes.number
};

export default DateCalendarModal;
