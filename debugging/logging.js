/**
 * debugging/logging.js
 *
 * Contains functions logging debugging data.
 */

/**
 * Log out the local storage contents.
 *
 * @param {string} key Local storage key
 * @returns {void}
 */
const logStorage = key => console.log(JSON.parse(window.localStorage.getItem(key)));

export { logStorage };
