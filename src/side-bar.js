import { LitElement, html, css } from 'lit-element';

class SideBar extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: absolute;
        width: 110px;
        height: fit-content;
        max-height: 100%;
        -moz-user-select: none;
        user-select: none;
        top: 40%;
        left: 5px;
        transform: translateY(-40%);
        z-index: 1;
      }
      button {
        width: 48px;
        height: 48px;
        font-size: 24px;
        font-weight: bold;
        color: white;
        background: linear-gradient(to bottom, #ffe259, #ffa751);
        border: 1px solid #fefefe;
        padding: 0px;
        margin: 2px;
        border-radius: 100%;
        outline: none;
        -moz-user-select: none;
      }
      button:first-child {
        display: block;
        margin: 0px auto;
      }
      .selected {
        border: 2px solid #fefefe;
      }
    `;
  }

  // Hightlights the selected mode button.
  onFocus(event) {
    this.shadowRoot
      .querySelectorAll('button')
      .forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
  }

  // Notifies other components of mode changes.
  onModeClick(event) {
    const modeChangeEvent = new window.CustomEvent('mode-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(modeChangeEvent);
  }

  render() {
    return html`
      <button
        title="Build"
        value="build-mode"
        @click="${this.onModeClick}"
        @focus="${this.onFocus}"
      >
        B
      </button>

      <button
        title="Move"
        value="move-mode"
        @click="${this.onModeClick}"
        @focus="${this.onFocus}"
      >
        M
      </button>

      <button
        title="Color"
        value="color-mode"
        @click="${this.onModeClick}"
        @focus="${this.onFocus}"
      >
        C
      </button>

      <my-color-picker></my-color-picker>
    `;
  }
}

window.customElements.define('my-side-bar', SideBar);
