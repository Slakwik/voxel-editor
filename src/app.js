import { loadSettings, saveSettings } from './settings-manager.js';
import './app-bar.js';
import './voxel-editor.js';
import './side-bar.js';
import './color-picker.js';
import './settings-menu.js';

const html = document.createElement('template');
html.innerHTML = `
  <my-app-bar></my-app-bar>
  <my-side-bar></my-side-bar>
`;

class App extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));

    this.voxelEditor = document.createElement('my-voxel-editor');

    // Sets default mode and color.
    this.voxelEditor.mode = 'build-mode';
    this.voxelEditor.color = 'hsl(60, 90%, 60%)';

    this.shadowRoot.appendChild(this.voxelEditor);

    // Sets default settings if there aren't any saved user settings.
    if (!loadSettings()) {
      saveSettings({
        antiAliasing: true,
        pbrMaterials: true,
        skyBackground: true
      });
    }
  }

  connectedCallback() {
    let sideBar = this.shadowRoot.querySelector('my-side-bar');

    sideBar.addEventListener('mode-change', event => {
      this.voxelEditor.mode = event.detail.message;
    });
    sideBar.addEventListener('color-change', event => {
      this.voxelEditor.color = event.detail.message;
    });

    // Opens the settings menu.
    this.addEventListener('menu-action', event => {
      if (event.detail.message === 'settings') {
        // Makes sure only one settings menu is opened.
        if (!this.shadowRoot.querySelector('my-settings-menu')) {
          const settingsMenu = document.createElement('my-settings-menu');
          this.shadowRoot.appendChild(settingsMenu);
        }
      }
    });
  }
}

window.customElements.define('my-app', App);
