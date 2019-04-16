import { LitElement, html, css } from 'lit-element'

class MyColorButton extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
      }
    `
  }

  render () {
    return html`<button></button>`
  }
}

window.customElements.define('my-color-button', MyColorButton)
