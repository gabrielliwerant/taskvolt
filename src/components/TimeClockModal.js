/**
 * src/components/TimeClockModal.js
 *
 * Renders the time clock modal section for choosing times and other interactions.
 */

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { Dialog, DialogActions, DialogContent, DialogTitle } from '@components/lib/Dialog';
import { Button } from '@components/lib/Button';
import { ButtonGroup } from '@components/lib/ButtonGroup';
import { Fab } from '@components/lib/Fab';
import { Tooltip } from '@components/lib/Tooltip';
import { Typography } from '@components/lib/Typography';
import { TimeClock } from '@components/lib/TimeClock';
import { FormControlLabel } from '@components/lib/FormControlLabel';

import { flex, flexCenterX, flexCenterY } from '@jss/styles';

import {
  getUnixTimestampFromDate,
  getDateFromUnixTimestamp,
  getTimeFormatted,
  isAm
} from '@src/utils';

const classNames = require('classnames');

// 12 * 60 * 60
const TWELVE_HOURS_IN_SECONDS = 43200;

// Possible views for time clock
const TIME_VIEWS = {
  HOURS: 'hours',
  MINUTES: 'minutes'
};

const useStyles = createUseStyles({
  time: {
    marginBottom: '10px'
  },
  amPm: {
    marginLeft: '10px'
  },
  amPmBtn: {
    padding: '0 !important'
  },
  hoursBtn: {
    marginLeft: '30px !important'
  },
  minutesBtn: {
    marginRight: '30px !important'
  },
  hoursMinutesBtns: {
    marginTop: '-40px',
    marginBottom: '30px'
  },
  flex,
  flexCenterY,
  flexCenterX
});

const TimeClockModal = ({
  onConfirm,
  onClose,
  isOpen,
  value,
  hasReminder,
  onReminderChange
}) => {
  const classes = useStyles();
  const [displayTime, setDisplayTime] = useState(getTimeFormatted(getDateFromUnixTimestamp(value)));
  const [chosenTime, setChosenTime] = useState(getDateFromUnixTimestamp(value));
  const [isReminderChecked, setIsReminderChecked] = useState(hasReminder);
  const [isReminderDisabled, setIsReminderDisabled] = useState(!value);
  const [isDayHalfAm, setIsDayHalfAm] = useState(isAm(getDateFromUnixTimestamp(value)));
  const [timeView, setTimeView] = useState(TIME_VIEWS.HOURS);
  const [isResetable, setIsResetable] = useState(!!value);

  useEffect(() => setIsResetable(!!value), [value]);

  /**
   * Handle update to display and saving data to state when we select new times.
   *
   * @param {object} value Date object
   * @returns {void}
   */
  const onTimeChange = myValue => {
    setDisplayTime(getTimeFormatted(myValue));
    setIsDayHalfAm(isAm(myValue));
    setChosenTime(myValue);
    setIsResetable(true);
    setIsReminderDisabled(false);

    if (timeView === TIME_VIEWS.HOURS) setTimeView(TIME_VIEWS.MINUTES);
  };

  /**
   * Handle state changes to the email reminder checkbox.
   *
   * @returns {void}
   */
  const onReminderChangeHandler = () => {
    setIsReminderChecked(!isReminderChecked);
    if (!isReminderChecked) setIsResetable(true);
  };

  /**
   * Handle dialog confirmation by saving chosen date.
   *
   * @returns {void}
   */
  const onTimeConfirm = () => {
    const timestamp = isResetable ? getUnixTimestampFromDate(chosenTime) : null;

    onConfirm(timestamp);
    onReminderChange(isReminderChecked);
    setTimeView(TIME_VIEWS.HOURS);
  };

  /**
   * Handle dialog close action.
   *
   * @returns {void}
   */
  const onTimeClose = () => {
    const date = getDateFromUnixTimestamp(value);

    onClose();
    setDisplayTime(getTimeFormatted(date));
    setChosenTime(date);
    setIsDayHalfAm(isAm(date));
    setIsReminderChecked(hasReminder);
    setTimeView(TIME_VIEWS.HOURS);
    if (!value) setIsReminderDisabled(true);
  };

  /**
   * Handles existing date removal in state.
   *
   * @returns {void}
   */
  const onTimeRemove = () => {
    setDisplayTime(getTimeFormatted());
    setIsDayHalfAm(isAm());
    setChosenTime(getDateFromUnixTimestamp());
    setTimeView(TIME_VIEWS.HOURS);
    setIsResetable(false);
    setIsReminderDisabled(true);
    setIsReminderChecked(false);
  };

  /**
   * Handles click event on the AM button, allowing us to switch to AM time if we're not already.
   *
   * @returns {void}
   */
  const onAmClick = () => {
    if (isDayHalfAm) return;

    const timestamp = getUnixTimestampFromDate(chosenTime) - TWELVE_HOURS_IN_SECONDS;

    setChosenTime(getDateFromUnixTimestamp(timestamp));
    setIsDayHalfAm(true);
    setIsResetable(true);
  };

  /**
   * Handles click event on the PM button, allowing us to switch to AM time if we're not already.
   *
   * @returns {void}
   */
  const onPmClick = () => {
    if (!isDayHalfAm) return;

    const timestamp = getUnixTimestampFromDate(chosenTime) + TWELVE_HOURS_IN_SECONDS;

    setChosenTime(getDateFromUnixTimestamp(timestamp));
    setIsDayHalfAm(false);
    setIsResetable(true);
  };

  /**
   * Handle the 'hours' button click by setting the view to 'hours'.
   *
   * @returns {void}
   */
  const onHoursClick = () => setTimeView(TIME_VIEWS.HOURS);

  /**
   * Handle the 'minutes' button click by setting the view to 'minutes'.
   *
   * @returns {void}
   */
  const onMinutesClick = () => setTimeView(TIME_VIEWS.MINUTES);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Fragment>
        <DialogTitle>
          <Typography variant='overline'>Select Time</Typography>
        </DialogTitle>
        <DialogContent>
          <div className={classNames({ [classes.flexCenterY]: true, [classes.time]: true })}>
            <Typography variant='h3'>{displayTime}</Typography>
            <div className={classes.amPm}>
              <ButtonGroup orientation='vertical' size='small'>
                <Button
                  variant={isDayHalfAm ? 'contained' : 'text'}
                  myClassName={classes.amPmBtn}
                  onClick={onAmClick}
                >
                  AM
                </Button>
                <Button
                  variant={isDayHalfAm ? 'text' : 'contained'}
                  myClassName={classes.amPmBtn}
                  onClick={onPmClick}
                >
                  PM
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className={classes.flexCenterX}>
            <FormControlLabel
              isDisabled={isReminderDisabled}
              label='Email reminder'
              isChecked={isReminderChecked}
              onChange={onReminderChangeHandler}
            />
          </div>
        </DialogContent>
        <TimeClock value={chosenTime} view={timeView} onChange={onTimeChange} />
        <div
          className={classNames({ [classes.hoursMinutesBtns]: true, [classes.flexCenterX]: true })}
        >
          <Tooltip title='Set view to hours'>
            <Fab
              myClassName={classes.hoursBtn}
              color={timeView === TIME_VIEWS.HOURS ? 'primary' : 'default'}
              onClick={onHoursClick}
            >
              H
            </Fab>
          </Tooltip>
          <Tooltip title='Set view to minutes'>
            <Fab
              myClassName={classes.minutesBtn}
              color={timeView === TIME_VIEWS.MINUTES ? 'primary' : 'default'}
              onClick={onMinutesClick}
            >
              M
            </Fab>
          </Tooltip>
        </div>
        <DialogActions styles={{ ...flexCenterX }}>
          <Fragment>
            <Button onClick={onTimeRemove} size='small' disabled={!isResetable}>Reset</Button>
            <div>
              <Button variant='text' onClick={onTimeConfirm}>Confirm</Button>
              <Button variant='text' onClick={onTimeClose}>Cancel</Button>
            </div>
          </Fragment>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
};

TimeClockModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hasReminder: PropTypes.bool.isRequired,
  onReminderChange: PropTypes.func.isRequired,
  value: PropTypes.number
};

export default TimeClockModal;
