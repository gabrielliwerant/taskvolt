/**
 * src/components/Name/utils.js
 *
 * Reusable utilties for `Name` components.
 */

import { getFormattedDateFromUnixTimestamp } from '@src/utils';
import { DATE_FORMAT, TIME_FORMAT_WITH_AM_PM } from '@src/constants';

// Regular expression to match URLs
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

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

/**
 * Determine if a given text string matches our url regex.
 *
 * @param {string} text
 * @returns {boolean}
 */
const isUrl = text => URL_REGEX.test(text);

/**
 * Split a given text string based on whether there is a url.
 *
 * Allows display of the text string with parts before and after url to be styled differently.
 *
 * @param {string} text
 * @returns {array[string]}
 */
const splitByUrl = text => text.split(URL_REGEX).filter(part => !!part.trim());

export { getDateTimeDisplayText, isUrl, splitByUrl };
