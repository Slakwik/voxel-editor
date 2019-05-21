/**
 * Module for the settings menu component.
 *
 * @module src/my-settings
 * @author Elias Pekkala
 * @version 1.0.0
 */

// Imports.
import { LitElement, html, css } from 'lit-element'
import { loadSettings, saveSettings } from './settings.js'

/**
 * The settings menu component.
 *
 * @class MySettings
 * @extends {LitElement}
 */
class MySettings extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   * @memberof MySettings
   */
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        border: 1px solid #FEFEFE;
        background-color: rgba(20, 140, 200, 0.5);
        border-radius: 4px;
        padding: 5px;
        height: 250px;
        width: 200px;
        left: 50%;
        top: 20%;
        transform: translate(-50%, -20%);
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
    `
  }

  /**
   * The component properties.
   *
   * @readonly
   * @static
   * @memberof MySettings
   */
  static get properties () {
    return {
      settings: { type: Object }
    }
  }

  /**
   * Creates an instance of MySettings.
   *
   * @memberof MySettings
   */
  constructor () {
    super()

    // Loads the current user settings.
    this.settings = loadSettings()
  }

  /**
   * Handles changes made to the settings.
   *
   * @param {Event} event A change event.
   * @memberof MySettings
   */
  onSettingChange (event) {
    switch (event.target.name) {
      case 'antiAliasing':
        this.settings.antiAliasing = event.target.checked
        break
      case 'pbrMaterials':
        this.settings.pbrMaterials = event.target.checked
        break
      case 'skyBackground':
        this.settings.skyBackground = event.target.checked
        break
    }
    saveSettings(this.settings)
  }

  /**
   * Handles closing the settings menu.
   *
   * @memberof MySettings
   */
  onCloseClick () {
    this.remove()
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MySettings
   */
  render () {
    return html`
      <div class='close' @click=${this.onCloseClick}>x</div>
      
      <h3>Settings</h3>
      
      <div class='setting'>
        <input type="checkbox" name="antiAliasing" @change="${this.onSettingChange}" ?checked="${this.settings.antiAliasing}">
        <label>Anti-aliasing</label>
      </div>
      
      <div class='setting'>
        <input type="checkbox" name="pbrMaterials" @change="${this.onSettingChange}" ?checked="${this.settings.pbrMaterials}">
        <label>PBR materials</label>
      </div>
      
      <div class='setting'>
        <input type="checkbox" name="skyBackground" @change="${this.onSettingChange}" ?checked="${this.settings.skyBackground}">
        <label>Sky background</label>
      </div>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-settings', MySettings)
