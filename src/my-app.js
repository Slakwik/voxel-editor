import { LitElement, html } from 'lit-element'
import './my-appbar'
import './my-element'
import './my-editor'

class MyApp extends LitElement {
  render () {
    return html`
      <my-appbar></my-appbar>
      <my-editor></my-editor>
      <p>Hello, from MyApp!</p>
      <my-element></my-element>
    `
  }
}

window.customElements.define('my-app', MyApp)
