/**
 * jss/utils.js
 *
 * Holds re-usable jss style utilties.
 */

const tilt = 'rotate(2deg)';

/**
 * Handle class concatenation for extra classes.
 *
 * @param {string} mainName Default class name
 * @param {array[string]} extraNames Potential extra class names
 * @returns {string} Concatenated classes or just original class name
 */
const getClassNames = (mainName, extraNames) => {
  let classNames = mainName;

  extraNames.forEach(name => {
    if (!name) return;

    classNames += ` ${name}`
  });

  return classNames.trim();
};

export { tilt, getClassNames };
