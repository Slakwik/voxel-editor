import { LitElement, html } from 'lit-element'

class MyElement extends LitElement {
  render () {
    return html`
      <p>Hello, from MyElement!</p>
    `
  }
}

window.customElements.define('my-element', MyElement)
