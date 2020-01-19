class UserSettings {
  // Loads a settings object from local storage and parses it.
  static load() {
    return JSON.parse(window.localStorage.getItem('settings'));
  }

  // Stringifies a settings object and saves it to local storage.
  static save(newSettings) {
    window.localStorage.setItem('settings', JSON.stringify(newSettings));
  }
}

export { UserSettings };
