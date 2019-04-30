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

  static get properties () {
    return {
      name: { type: String }
    }
  }

  render () {
    return html`
      <div>${this.name}</div>
    `
  }
}

window.customElements.define('my-dropdown', MyDropdown)
