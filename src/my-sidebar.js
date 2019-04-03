import { LitElement, html, css } from 'lit-element'

class SideBar extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 20%;
        background-color: orange;
      }
    `
  }

  render () {
    return html`
      <h3>Build</h3>
      <h3>Color</h3>
    `
  }
}

window.customElements.define('my-sidebar', SideBar)
