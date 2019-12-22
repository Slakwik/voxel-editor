// Loads a settings object from local storage and parses it.
function loadSettings() {
  return JSON.parse(window.localStorage.getItem('settings'));
}

// Stringifies a settings object and saves it to local storage.
function saveSettings(settings) {
  window.localStorage.setItem('settings', JSON.stringify(settings));
}

export { loadSettings, saveSettings };
