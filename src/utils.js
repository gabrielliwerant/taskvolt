/**
 * src/utils.js
 *
 * Separate exportable, reusable utilities.
 */

import dayjs from 'dayjs';

import { DATE_FORMAT, TIME_FORMAT, TIME_FORMAT_ONLY_AM_PM } from '@src/constants';

/**
 * Create ids for new lists/items
 *
 * @returns {string}
 */
const makeId = () => `${Math.floor(Math.random() * 100000000000)}`;

/**
 * Get numerical id from draggable id string
 *
 * @param {string} id
 * @returns {string}
 */
const getDragDropId = id => id.split('-').pop();

/**
 * Get the index of a sorted list from an id.
 *
 * @param {string} id
 * @param {object} sort
 * @returns {string}
 */
const getIndexFromId = (id, sort) => Object.values(sort).findIndex(el => el === id);

/**
 * Retrieve the unix timestamp in seconds from a valid date object.
 *
 * @param {object|null} date Date object
 * @returns {integer}
 */
const getUnixTimestampFromDate = date => date ? dayjs(date).unix() : dayjs().unix();

/**
 * Retrieve the date object from a unix timestamp in seconds.
 *
 * @param {integer} unix Timestamp in seconds
 * @returns {object} Date object
 */
const getDateFromUnixTimestamp = unix => dayjs.unix(unix || getUnixTimestampFromDate());

/**
 * Retrieve the date object as a formatted data string.
 *
 * @param {object|null} dateTime Date object
 * @param {string} format Format string for date/time
 * @returns {string} Formatted date
 */
const getDateFormatted = (dateTime, format = DATE_FORMAT) =>
  dateTime ? dayjs(dateTime).format(format) : dayjs().format(format);

/**
 * Retrieve the unix timestamp as a formatted data string.
 *
 * @param {integer} unix Timestamp in seconds
 * @param {string} format Format string for date/time
 * @returns {string} Formatted date/time
 */
const getFormattedDateFromUnixTimestamp = (unix, format) =>
  getDateFormatted(getDateFromUnixTimestamp(unix), format);

/**
 * Retrieve the time object as a formatted data string.
 *
 * @param {object|null} date Date object
 * @returns {string} Formatted date
 */
const getTimeFormatted = date =>
  date ? dayjs(date).format(TIME_FORMAT) : dayjs().format(TIME_FORMAT);

/**
 * Determines from a given date or the current date whether we're in the AM.
 *
 * @param {object|null} dateTime Date object
 */
const isAm = dateTime => dateTime
  ? dayjs(dateTime).format(TIME_FORMAT_ONLY_AM_PM) === 'AM'
  : dayjs().format(TIME_FORMAT_ONLY_AM_PM) === 'AM';

export {
  makeId,
  getDragDropId,
  getIndexFromId,
  getUnixTimestampFromDate,
  getDateFromUnixTimestamp,
  getDateFormatted,
  getFormattedDateFromUnixTimestamp,
  getTimeFormatted,
  isAm
};
