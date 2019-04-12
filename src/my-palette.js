import { LitElement, html, css } from 'lit-element'

class Palette extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        height: fit-content;
        position: absolute;
        border: 2px solid orange;
        width: 5%;
        top: 35%;
      }
      button {     
        border: none;
        padding: 10px;
        border-radius: 2px;
        margin: 4px 4px;
      }
    `
  }

  render () {
    return html`
      <div>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
    `
  }
}

window.customElements.define('my-palette', Palette)
