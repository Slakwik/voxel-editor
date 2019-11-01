/**
 * Module for the main app component.
 *
 * @module src/my-app
 * @author Elias Pekkala
 */

// Imports modules and components.
import { LitElement, html } from 'lit-element';
import { loadSettings, saveSettings } from './settings-manager.js';
import './app-bar.js';
import './voxel-editor.js';
import './side-bar.js';
import './color-picker.js';
import './settings-menu.js';

/**
 * The main app component.
 *
 * @class MyApp
 * @extends {LitElement}
 */
class App extends LitElement {
  /**
   * The component properties.
   *
   * @readonly
   * @static
   */
  static get properties() {
    return {
      // The currently active mode.
      mode: { type: String },
      // The currently active color.
      color: { type: String }
    };
  }

  /**
   * Creates an instance of MyApp.
   */
  constructor() {
    super();

    // Sets the default mode and color.
    this.mode = 'build-mode';
    this.color = 'hsl(60, 90%, 60%)';

    // Sets and saves default settings if there aren't any user settings.
    if (!loadSettings()) {
      saveSettings({
        antiAliasing: true,
        pbrMaterials: true,
        skyBackground: true
      });
    }
  }

  /**
   * Gets called when the component updates for the first time.
   */
  firstUpdated() {
    // Handles opening the settings menu.
    this.addEventListener('menu-action', event => {
      if (event.detail.message === 'settings') {
        // Only opens one settings menu.
        if (!this.shadowRoot.querySelector('my-settings-menu')) {
          const settingsMenu = document.createElement('my-settings-menu');
          this.shadowRoot.appendChild(settingsMenu);
        }
      }
    });
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   */
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

// Registers the custom element with the browser.
window.customElements.define('my-app', App);
