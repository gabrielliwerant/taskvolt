/**
 * src/components/Name/utils.js
 *
 * Reusable utilties for `Name` components.
 */

import { getFormattedDateFromUnixTimestamp } from '@src/utils';
import { DATE_FORMAT, TIME_FORMAT_WITH_AM_PM } from '@src/constants';

/**
 * Build the display text for date/time based on whether we have one or both timestamps.
 *
 * @returns {string}
 */
const getDateTimeDisplayText = (dateTimestamp, timeTimestamp) => {
  const dateFormatted = !!dateTimestamp
    ? getFormattedDateFromUnixTimestamp(dateTimestamp, DATE_FORMAT)
    : '';
  const timeFormatted = !!timeTimestamp
    ? getFormattedDateFromUnixTimestamp(timeTimestamp, TIME_FORMAT_WITH_AM_PM)
    : '';

  return `${dateFormatted} ${timeFormatted}`;
};

export { getDateTimeDisplayText };
