import { LitElement, html, css } from 'lit-element'

class MyColorButton extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
      }
      button {     
        border: none;
        padding: 10px;
        border: 2px solid white;
        border-radius: 5px;
        margin: 4px 4px;
        font-size: 8px;
        cursor: pointer;
      }
    `
  }

  render () {
    return html`<button></button>`
  }
}

window.customElements.define('my-color-button', MyColorButton)
