import { LitElement, html, css } from 'lit-element'

class MySideBar extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        width: fit-content;
        height: fit-content;
        max-height: 100%;
        background-color: salmon;
        top: 40%;
        transform: translateY(-40%);
        z-index: 1;
      }
      div {
        background-color: yellow;
      }
      input {
        background-color: orange;
        height: 50%;
        width: 30%;
        padding: 10px;
        border-radius: 100%;
      }
    `
  }

  onModeClick (event) {
    const modeChangeEvent = new window.CustomEvent('mode-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(modeChangeEvent)
  }

  render () {
    return html`
      <div>
        <input type="image" @click="${this.onModeClick}" value="build-mode" alt="Build" draggable="false" src="./icons/build.png">
        <input type="image" @click="${this.onModeClick}" value="color-mode" alt="Color" draggable="false" src="./icons/color.png">
      </div>
      <my-palette></my-palette>
    `
  }
}

window.customElements.define('my-sidebar', MySideBar)
