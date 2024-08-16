/**
 * src/main/export.js
 *
 * Handles export functionality and logic for local JSON data.
 */

import { LOCAL_STORAGE_KEY } from '@src/constants';

/**
 * Handle export of local storage JSON data.
 *
 * Triggers a download by creating a link element and triggering a click action.
 *
 * @returns {void}
 */
const exportLocalJsonData = () => {
  const dataToExport = localStorage.getItem(LOCAL_STORAGE_KEY);
  const stringifiedData = JSON.stringify(dataToExport);
  const blob = new Blob([stringifiedData], { type: 'application/json' });

  // Create a downloadable link
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'taskvolt_export.json';

  // Trigger download
  link.click();
};

export { exportLocalJsonData };
