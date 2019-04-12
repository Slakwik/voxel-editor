import { LitElement, html, css } from 'lit-element'

class SideBar extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        width: fit-content;
        height: fit-content;
        position: absolute;
        width: 5%;
        top: 20%;
      }
      input {
        background-color: orange;
        height: 36px;
        window: 36px;
        padding: 10px;
        margin: 3px;
        border-radius: 100%;
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
      <input type="image" value="build-mode" alt="Build" draggable="false" src="../icons/build.png">
      <input type="image" value="color-mode" alt="Color" draggable="false" src="../icons/color.png">
    `
  }
}

window.customElements.define('my-sidebar', SideBar)
