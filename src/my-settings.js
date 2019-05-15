import { LitElement, html, css } from 'lit-element'
import { loadSettings, saveSettings } from './settings.js'

class MySettings extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        border: 1px solid #FEFEFE;
        background-color: rgba(20, 140, 200, 0.2);
        border-radius: 4px;
        padding: 5px;
        height: 250px;
        width: 200px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
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
    `
  }

  static get properties () {
    return {
      settings: { type: Object }
    }
  }

  constructor () {
    super()
    this.settings = loadSettings()
  }

  onSettingChange (event) {
    switch (event.target.name) {
      case 'antiAliasing':
        this.settings.antiAliasing = event.target.checked
        break
      case 'pbrMaterials':
        this.settings.pbrMaterials = event.target.checked
        break
    }
    saveSettings(this.settings)
  }

  onCloseClick () {
    this.remove()
  }

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
    `
  }
}

window.customElements.define('my-settings', MySettings)
