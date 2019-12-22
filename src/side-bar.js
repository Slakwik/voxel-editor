/**
 * Module for the sidebar component.
 *
 * @module src/my-sidebar
 * @author Elias Pekkala
 */

// Imports.
import { LitElement, html, css } from 'lit-element';

/**
 * The sidebar component.
 *
 * @class MySideBar
 * @extends {LitElement}
 */
class SideBar extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   */
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

  /**
   * Handles the visual indication of which mode is currently selected.
   *
   * @param {Event} event A focus event.
   */
  onFocus(event) {
    this.shadowRoot
      .querySelectorAll('button')
      .forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
  }

  /**
   * Notifies other components of mode changes.
   *
   * @param {Event} event A click event.
   */
  onModeClick(event) {
    const modeChangeEvent = new window.CustomEvent('mode-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(modeChangeEvent);
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   */
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

// Registers the custom element with the browser.
window.customElements.define('my-side-bar', SideBar);
