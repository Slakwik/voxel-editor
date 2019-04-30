import { LitElement, html, css } from 'lit-element'

class MyDropdown extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      div {
        background-color: cyan;
      }
    `
  }

  render () {
    return html`
      <div>Dropdown</div>
    `
  }
}

window.customElements.define('my-dropdown', MyDropdown)
