/**
 * Module for the main app component.
 *
 * @module src/my-app
 * @author Elias Pekkala
 */

// Imports modules and components.
import { LitElement, html } from 'lit-element'
import { loadSettings, saveSettings } from './settings.js'
import './my-appbar'
import './my-editor'
import './my-sidebar'
import './my-palette'
import './my-settings'

/**
 * The main app component.
 *
 * @class MyApp
 * @extends {LitElement}
 */
class MyApp extends LitElement {
  /**
   * The component properties.
   *
   * @readonly
   * @static
   */
  static get properties () {
    return {
      // The currently active mode.
      mode: { type: String },
      // The currently active color.
      color: { type: String }
    }
  }

  /**
   * Creates an instance of MyApp.
   */
  constructor () {
    super()

    // Sets the default mode and color.
    this.mode = 'build-mode'
    this.color = 'hsl(60, 90%, 60%)'

    // Sets and saves default settings if there aren't any user settings.
    if (!loadSettings()) {
      saveSettings({ antiAliasing: true, pbrMaterials: true, skyBackground: true })
    }
  }

  /**
   * Gets called when the component updates for the first time.
   */
  firstUpdated () {
    // Handles opening the settings menu.
    this.addEventListener('menu-action', (event) => {
      if (event.detail.message === 'settings') {
        let settingsMenu = this.shadowRoot.querySelector('my-settings')

        // Only opens the settings menu if there isn't one already.
        if (!this.shadowRoot.contains(settingsMenu)) {
          settingsMenu = document.createElement('my-settings')
          this.shadowRoot.appendChild(settingsMenu)
        }
      }
    })
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   */
  render () {
    return html`
      <my-appbar></my-appbar>
      
      <my-editor .mode=${this.mode} .color=${this.color}></my-editor>
      
      <my-sidebar @mode-change="${(e) => { this.mode = e.detail.message }}" @color-change="${(e) => { this.color = e.detail.message }}"></my-sidebar>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-app', MyApp)
