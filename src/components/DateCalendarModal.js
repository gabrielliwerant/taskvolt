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
  value,
  hasEmailReminder,
  onEmailReminderChange
}) => {
  const classes = useStyles();
  const [displayDate, setDisplayDate] = useState(getDateFormatted());
  const [chosenDate, setChosenDate] = useState(setInitialDate(value));
  const [isEmailReminderChecked, setIsEmailReminderChecked] = useState(hasEmailReminder);

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
   * Handle state changes to the email reminder checkbox.
   *
   * @returns {void}
   */
  const onEmailReminderChangeHandler = () => setIsEmailReminderChecked(!isEmailReminderChecked);

  /**
   * Handle dialog confirmation by saving chosen date.
   *
   * @returns {void}
   */
  const onDateConfirm = () => {
    const myDate = chosenDate ? getUnixTimestampFromDate(chosenDate) : null;

    onConfirm(myDate);
    onEmailReminderChange(isEmailReminderChecked);
  };

  /**
   * Handle dialog close action.
   *
   * @returns {void}
   */
  const onDateClose = () => {
    setChosenDate(setInitialDate(value));
    setIsEmailReminderChecked(hasEmailReminder);
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
          <div className={classes.flexCenterX}>
            <Button onClick={onDateRemove} size='small'>Remove Date</Button>
            <FormControlLabel
              isDisabled={!chosenDate}
              label='Email reminder'
              isChecked={isEmailReminderChecked}
              onChange={onEmailReminderChangeHandler}
            />
          </div>
        </DialogContent>
        <DateCalendar value={chosenDate} onChange={onDateChange} />
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

DateCalendarModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hasEmailReminder: PropTypes.bool.isRequired,
  onEmailReminderChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  extraActions: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
};

DateCalendarModal.defaultProps = {
  value: null
};

export default DateCalendarModal;
