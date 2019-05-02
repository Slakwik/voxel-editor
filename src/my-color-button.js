import { LitElement, html, css } from 'lit-element'

class MyColorButton extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      button {     
        padding: 12px;
        border: 1px solid white;
        border-radius: 4px;
        margin: 4px 2px;
        cursor: pointer;
        outline:none;
      }
    `
  }

  static get properties () {
    return {
      color: { type: String }
    }
  }

  onClick (event) {
    const colorChangeEvent = new window.CustomEvent('color-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(colorChangeEvent)
  }

  render () {
    return html`
      <style>button { background-color: ${this.color}; }</style>
      <button value='${this.color}' @click='${this.onClick}'></button>
    `
  }
}

window.customElements.define('my-color-button', MyColorButton)
