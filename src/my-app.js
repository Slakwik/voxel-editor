import { LitElement, html } from 'lit-element'
import './my-appbar'
import './my-editor'

class MyApp extends LitElement {
  render () {
    return html`
      <my-appbar></my-appbar>
      <my-editor></my-editor>
    `
  }
}

window.customElements.define('my-app', MyApp)
