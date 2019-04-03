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
      div {
        background-color: yellow;
      }
      h4 {
        margin: 10px 0 0 0;
      }
    `
  }

  render () {
    return html`
      <h3>Build</h3>
      <h3>Color</h3>
      
      <div>
        <h4>Add</h4>
        <h4>Remove</h4>
      </div>
    `
  }
}

window.customElements.define('my-sidebar', SideBar)
