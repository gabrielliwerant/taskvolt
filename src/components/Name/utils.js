/**
 * src/components/Name/utils.js
 *
 * Reusable utilties for `Name` components.
 */

import { getFormattedDateFromUnixTimestamp } from '@src/utils';
import { DATE_FORMAT, TIME_FORMAT_WITH_AM_PM } from '@src/constants';

// Regular expression to match URLs
const URLS_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_REGEX = /(https?:\/\/[^\s]+)/;

// Regular expressions for backticks
const BACKTICKS_REGEX = /`([^`]+)`|([^`]+)/g;
const BACKTICKS_SURROUND_REGEX = /`([^`]+)`/

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
 * Determine if a given text string is surrounded by backticks.
 *
 * @param {string} text
 * @returns {boolean}
 */
const hasBacktickSurround = text => BACKTICKS_SURROUND_REGEX.test(text);

/**
 * Split a given text string based on whether there is a url.
 *
 * Allows display of the text string with parts before and after url to be styled differently.
 *
 * @param {string} text
 * @returns {array[string]}
 */
const splitByUrl = text => text.split(URLS_REGEX).filter(part => !!part.trim());

/**
 * Split a given text string based on whether it is surrounded by backticks.
 *
 * Allows display of the text string surrouded by backticks to be treated as code for display.
 *
 * @param {string} text
 * @returns {array[string]}
 */
const splitByBackticks = text => text.match(BACKTICKS_REGEX).map(segment => segment);

/**
 * Removes the first and last character from a string.
 *
 * @param {string} text
 * @returns {string}
 */
const removeLeadingAndTrailing = text => text.slice(1, -1);

export {
  getDateTimeDisplayText,
  isUrl,
  hasBacktickSurround,
  splitByUrl,
  splitByBackticks,
  removeLeadingAndTrailing
};
