/**
 * Module for the sidebar component.
 *
 * @module src/my-sidebar
 * @author Elias Pekkala
 * @version 1.0.0
 */

// Imports.
import { LitElement, html, css } from 'lit-element'

/**
 * The sidebar component.
 *
 * @class MySideBar
 * @extends {LitElement}
 */
class MySideBar extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   * @memberof MySideBar
   */
  static get styles () {
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
        border: 1px solid #FEFEFE;
        padding: 6px;
        margin: 1px;
        border-radius: 100%;
        outline:none;
      }
      .selected {
        border: 2px solid #FEFEFE;
        margin: 0px;
      }
      input:first-child {
        display: block;
        margin: 1px auto;
      }
      .selected:first-child {
        margin: 0px auto;
      }
    `
  }

  /**
   * Handles the visual indication of which mode is currently selected.
   *
   * @param {Event} event A focus event.
   * @memberof MySideBar
   */
  onFocus (event) {
    this.shadowRoot.querySelectorAll('input').forEach(el => el.classList.remove('selected'))
    event.target.classList.add('selected')
  }

  /**
   * Notifies other components of mode changes.
   *
   * @param {Event} event A click event.
   * @memberof MySideBar
   */
  onModeClick (event) {
    const modeChangeEvent = new window.CustomEvent('mode-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(modeChangeEvent)
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MySideBar
   */
  render () {
    return html`
      <input type="image" title="Build" alt="Build" value="build-mode" src="./icons/build.png" draggable="false" @click="${this.onModeClick}"
        @focus="${this.onFocus}">
      <input type="image" title="Move" alt="Move" value="move-mode" src="./icons/move.png" draggable="false" @click="${this.onModeClick}"
        @focus="${this.onFocus}">
      <input type="image" title="Color" alt="Color" value="color-mode" src="./icons/color.png" draggable="false" @click="${this.onModeClick}"
        @focus="${this.onFocus}">
      
      <my-palette></my-palette>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-sidebar', MySideBar)
