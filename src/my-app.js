import { LitElement, html } from 'lit-element'
import './my-appbar'
import './my-editor'
import './my-sidebar'
import './my-palette'

class MyApp extends LitElement {
  static get properties () {
    return {
      mode: { type: String }
    }
  }

  constructor () {
    super()
    this.mode = 'build-mode'
  }

  render () {
    return html`
      <my-appbar></my-appbar>
      <my-editor mode="${this.mode}"></my-editor>
      <my-sidebar @mode-change="${(e) => { this.mode = e.detail.message }}"></my-sidebar>
      <my-palette></my-palette>
    `
  }
}

window.customElements.define('my-app', MyApp)
