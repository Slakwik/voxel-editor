import { LitElement, html } from 'lit-element'
import './three'
import './my-appbar'
import './my-editor'
import './my-sidebar'
import './my-palette'

class MyApp extends LitElement {
  static get properties () {
    return {
      mode: { type: String },
      color: { type: String },
      action: { type: String }
    }
  }

  constructor () {
    super()
    this.mode = 'build-mode'
    this.color = 'hsl(60, 90%, 60%)'
  }

  render () {
    return html`
      <my-appbar @menu-action="${(e) => { this.action = e.detail.message }}"></my-appbar>
      <my-editor .mode=${this.mode} .color=${this.color} action=${this.action}></my-editor>
      <my-sidebar @mode-change="${(e) => { this.mode = e.detail.message }}" @color-change="${(e) => { this.color = e.detail.message }}"></my-sidebar>
    `
  }
}

window.customElements.define('my-app', MyApp)
