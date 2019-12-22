import { LitElement, html, css } from 'lit-element';
import { loadSettings, saveSettings } from './settings-manager.js';

class SettingsMenu extends LitElement {
  static get styles() {
    return css`
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
    `;
  }

  static get properties() {
    return {
      settings: { type: Object }
    };
  }

  constructor() {
    super();

    // Loads the user settings from local storage.
    this.settings = loadSettings();
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
    saveSettings(this.settings);
  }

  onCloseClick() {
    this.remove();
  }

  render() {
    return html`
      <div class="close" @click=${this.onCloseClick}>x</div>

      <h3>Settings</h3>

      <div class="setting">
        <input
          type="checkbox"
          name="antiAliasing"
          @change="${this.onSettingChange}"
          ?checked="${this.settings.antiAliasing}"
        />
        <label>Anti-aliasing</label>
      </div>

      <div class="setting">
        <input
          type="checkbox"
          name="pbrMaterials"
          @change="${this.onSettingChange}"
          ?checked="${this.settings.pbrMaterials}"
        />
        <label>PBR materials</label>
      </div>

      <div class="setting">
        <input
          type="checkbox"
          name="skyBackground"
          @change="${this.onSettingChange}"
          ?checked="${this.settings.skyBackground}"
        />
        <label>Sky background</label>
      </div>
    `;
  }
}

window.customElements.define('my-settings-menu', SettingsMenu);
