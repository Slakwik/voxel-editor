/**
 * Module for managing user settings.
 *
 * @module src/settings
 * @author Elias Pekkala
 */

/**
 * Loads a JSON string with settings from local storage and parses it.
 *
 * @returns An object with settings.
 */
function loadSettings() {
  return JSON.parse(window.localStorage.getItem('settings'));
}

/**
 * Stringifies a settings object and saves it to local storage.
 *
 * @param {Object} settings An object with settings.
 */
function saveSettings(settings) {
  window.localStorage.setItem('settings', JSON.stringify(settings));
}

// Exports.
export { loadSettings, saveSettings };
