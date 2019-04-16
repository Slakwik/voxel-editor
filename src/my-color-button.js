import { LitElement, html, css } from 'lit-element'

class MyColorButton extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline;
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

  static get properties () {
    return {
      color: { type: String }
    }
  }

  render () {
    return html`<button style='background-color:${this.color};'></button>`
  }
}

window.customElements.define('my-color-button', MyColorButton)
