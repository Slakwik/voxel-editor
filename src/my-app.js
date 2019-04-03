import { LitElement, html } from 'lit-element'
import './my-appbar'
import './my-editor'
import './my-sidebar'

class MyApp extends LitElement {
  render () {
    return html`
      <my-appbar></my-appbar>
      <my-editor></my-editor>
      <my-sidebar></my-sidebar>
    `
  }
}

window.customElements.define('my-app', MyApp)
