import { LitElement, html } from 'lit-element'
import './my-appbar'
import './my-editor'
import './my-sidebar'

class MyApp extends LitElement {
  render () {
    return html`
      <my-appbar></my-appbar>
      <my-editor></my-editor>
      <my-sidebar @mode-change="${(e) => { console.log(e.detail.message) }}"></my-sidebar>
    `
  }
}

window.customElements.define('my-app', MyApp)
