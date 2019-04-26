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
      color: { type: String }
    }
  }

  constructor () {
    super()
    this.mode = 'build-mode'
    this.color = 'hsl(60, 90%, 60%)'
  }

  render () {
    return html`
      <my-appbar></my-appbar>
      <my-editor .mode=${this.mode} .color=${this.color}></my-editor>
      <my-sidebar @mode-change="${(e) => { this.mode = e.detail.message }}"></my-sidebar>
      <my-palette @color-change="${(e) => { this.color = e.detail.message }}"></my-palette>
    `
  }
}

window.customElements.define('my-app', MyApp)
