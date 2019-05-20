/**
 * Module for the main app component.
 *
 * @module src/my-app
 * @author Elias Pekkala
 * @version 1.0.0
 */

// Imports modules and other components.
import { LitElement, html } from 'lit-element'
import { loadSettings, saveSettings } from './settings.js'
import './three'
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
   * @memberof MyApp
   */
  static get properties () {
    return {
      // The currently active mode.
      mode: { type: String },
      // The currently active color for building / coloring.
      color: { type: String }
    }
  }

  /**
   * Creates an instance of MyApp.
   *
   * @memberof MyApp
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
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MyApp
   */
  render () {
    return html`
      <my-appbar></my-appbar>
      
      <my-editor .mode=${this.mode} .color=${this.color}></my-editor>
      
      <my-sidebar @mode-change="${(e) => { this.mode = e.detail.message }}" @color-change="${(e) => { this.color = e.detail.message }}"></my-sidebar>
      
      ${this.menuAction === 'settings' ? html`<my-settings></my-settings>` : ''}
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-app', MyApp)
