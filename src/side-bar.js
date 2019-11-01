/**
 * Module for the sidebar component.
 *
 * @module src/my-sidebar
 * @author Elias Pekkala
 */

// Imports.
import { LitElement, html, css } from 'lit-element';
import buildModeIcon from 'material-design-icons/content/1x_web/ic_create_black_36dp.png';
import moveModeIcon from 'material-design-icons/action/1x_web/ic_open_with_black_36dp.png';
import colorModeIcon from 'material-design-icons/editor/1x_web/ic_format_color_fill_black_36dp.png';

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
      input {
        background: linear-gradient(to bottom, #ffe259, #ffa751);
        border: 1px solid #fefefe;
        padding: 6px;
        margin: 1px;
        border-radius: 100%;
        outline: none;
        -moz-user-select: none;
      }
      .selected {
        border: 2px solid #fefefe;
        margin: 0px;
      }
      input:first-child {
        display: block;
        margin: 1px auto;
      }
      .selected:first-child {
        margin: 0px auto;
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
      .querySelectorAll('input')
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
      <input
        type="image"
        title="Build"
        alt="Build"
        value="build-mode"
        src=${buildModeIcon}
        draggable="false"
        @click="${this.onModeClick}"
        @focus="${this.onFocus}"
      />
      <input
        type="image"
        title="Move"
        alt="Move"
        value="move-mode"
        src=${moveModeIcon}
        draggable="false"
        @click="${this.onModeClick}"
        @focus="${this.onFocus}"
      />
      <input
        type="image"
        title="Color"
        alt="Color"
        value="color-mode"
        src=${colorModeIcon}
        draggable="false"
        @click="${this.onModeClick}"
        @focus="${this.onFocus}"
      />

      <my-color-picker></my-color-picker>
    `;
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-side-bar', SideBar);
