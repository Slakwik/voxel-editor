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
        user-select: none;
        top: 40%;
        left: 5px;
        transform: translateY(-40%);
        z-index: 1;
      }
      input {
        background: linear-gradient(to bottom, #ffe259, #ffa751);
        border: 1px solid #FEFEFE;
        padding: 8px;
        border-radius: 100%;
        outline:none;
      }
      .selected {
        border: 2px solid #FEFEFE;
      }
    `
  }

  onFocus (event) {
    this.shadowRoot.querySelectorAll('input').forEach(el => el.classList.remove('selected'))
    event.target.classList.add('selected')
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
        <input type="image" @click="${this.onModeClick}" @focus='${this.onFocus}' value="build-mode" alt="Build" draggable="false"
          src="./icons/build.png">
        <input type="image" @click="${this.onModeClick}" @focus='${this.onFocus}' value="color-mode" alt="Color" draggable="false"
          src="./icons/color.png">
      </div>
      <my-palette></my-palette>
    `
  }
}

window.customElements.define('my-sidebar', MySideBar)
