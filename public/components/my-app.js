import { LitElement, html } from 'lit-element'
import './my-element'

class MyApp extends LitElement {
  render () {
    return html`
      <p>Hello, from MyApp!</p>
      <my-element></my-element>
    `
  }
}

window.customElements.define('my-app', MyApp)
