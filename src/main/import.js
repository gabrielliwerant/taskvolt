/**
 * src/main/import.js
 *
 * Handles import functionality and logic for retrieving and setting local JSON data.
 */

import { LOCAL_STORAGE_KEY } from '@src/constants';

/**
 * Imports a local JSON file supplied by the user to update application data.
 *
 * On successful upload, read the file and attempt to parse JSON data. If successful, use it to
 * replace application state and reload the application so the new changes will take effect.
 *
 * TODO: Sanitize data.
 *
 * @param {element} el HTML element
 * @returns {boolean}
 */
const importLocalJsonData = el => {
  const file = el.files[0];

  if (!file) return console.log('No file found.');

  const fileReader = new FileReader();

  fileReader.onload = e => {
    const fileContents = e.target.result;

    try {
      const jsonData = JSON.parse(fileContents);

      localStorage.setItem(LOCAL_STORAGE_KEY, jsonData);
      location.reload(); // Reload the app to display data changes
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  fileReader.readAsText(file);
};

export { importLocalJsonData };
