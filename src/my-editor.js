import { LitElement, html, css } from 'lit-element'

class MyEditor extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        background-color: darkgray;
      }
    `
  }

  render () {
    return html`
      <p>3D view goes here.</p>
    `
  }
}

window.customElements.define('my-editor', MyEditor)
