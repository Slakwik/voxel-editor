import { LitElement, html } from 'lit-element';
import { loadSettings, saveSettings } from './settings-manager.js';
import './app-bar.js';
import './voxel-editor.js';
import './side-bar.js';
import './color-picker.js';
import './settings-menu.js';

class App extends LitElement {
  static get properties() {
    return {
      // The active mode.
      mode: { type: String },
      // The active color.
      color: { type: String }
    };
  }

  constructor() {
    super();

    // Sets default mode and color.
    this.mode = 'build-mode';
    this.color = 'hsl(60, 90%, 60%)';

    // Sets default settings if there aren't any saved user settings.
    if (!loadSettings()) {
      saveSettings({
        antiAliasing: true,
        pbrMaterials: true,
        skyBackground: true
      });
    }
  }

  firstUpdated() {
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

  render() {
    return html`
      <my-app-bar></my-app-bar>

      <my-voxel-editor
        .mode=${this.mode}
        .color=${this.color}
      ></my-voxel-editor>

      <my-side-bar
        @mode-change="${e => {
          this.mode = e.detail.message;
        }}"
        @color-change="${e => {
          this.color = e.detail.message;
        }}"
      ></my-side-bar>
    `;
  }
}

window.customElements.define('my-app', App);
