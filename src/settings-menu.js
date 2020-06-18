import { UserSettings } from './UserSettings.js';

const html = document.createElement('template');
html.innerHTML = `
  <div class="close">x</div>
  <h3>Settings</h3>
`;

const css = document.createElement('template');
css.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      border: 1px solid #fefefe;
      background-color: rgba(20, 140, 200, 0.5);
      border-radius: 4px;
      padding: 5px;
      height: 250px;
      width: 200px;
      left: 50%;
      top: 20%;
      transform: translate(-50%, -20%);
      -moz-user-select: none;
      user-select: none;
      color: white;
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0px 6px;
      cursor: pointer;
      font-size: 20px;
    }
    h3 {
      margin: 0px 3px;
    }
    .setting {
      margin: 10px;
    }
    input {
      width: 15px;
      height: 15px;
    }
    input:focus {
      outline: none;
    }
  </style>
`;

class SettingsMenu extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));

    // Loads the user settings from local storage.
    this.settings = UserSettings.load() || {};

    let keys = Object.keys(this.settings);

    keys.forEach((key, index) => {
      let div = document.createElement('div');
      div.classList.add('setting');

      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = key;
      checkbox.checked = this.settings[key];
      div.appendChild(checkbox);

      let label = document.createElement('label');
      label.textContent = key;
      div.appendChild(label);

      this.shadowRoot.appendChild(div);
    });
  }

  connectedCallback() {
    let closeButton = this.shadowRoot.querySelector('.close');
    closeButton.addEventListener('click', (event) => {
      this.onCloseClick();
    });
    let settingsCheckboxes = this.shadowRoot.querySelectorAll('input');
    settingsCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        this.onSettingChange(event);
      });
    });
  }

  // Handles changes made to the settings.
  onSettingChange(event) {
    switch (event.target.name) {
      case 'antiAliasing':
        this.settings.antiAliasing = event.target.checked;
        break;
      case 'pbrMaterials':
        this.settings.pbrMaterials = event.target.checked;
        break;
      case 'skyBackground':
        this.settings.skyBackground = event.target.checked;
        break;
    }
    UserSettings.save(this.settings);
  }

  onCloseClick() {
    this.remove();
  }
}

window.customElements.define('my-settings-menu', SettingsMenu);
