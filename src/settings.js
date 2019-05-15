function loadSettings () {
  return JSON.parse(window.localStorage.getItem('settings'))
}

function saveSettings (settings) {
  window.localStorage.setItem('settings', JSON.stringify(settings))
}

export { loadSettings, saveSettings }
