/**
 * Module for the dropdown component.
 *
 * @module src/my-dropdown
 * @author Elias Pekkala
 * @version 1.0.0
 */

// Imports.
import { LitElement, html, css } from 'lit-element'

/**
 * The dropdown component.
 *
 * @class MyDropdown
 * @extends {LitElement}
 */
class MyDropdown extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   * @memberof MyDropdown
   */
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      button {
        background-color: rgba(0,0,0,0);
        border: 1px solid #FEFEFE;
        color: white;
        padding: 4px 10px;
        margin: 5px 3px;
        border-radius: 3px;
        display: inline;
        cursor: pointer;
        outline: none;
      }
      button:active {
        transform: translateY(1px);
      }
      button::-moz-focus-inner {
        border: none;
      }
      .content {
        display: inline;
      }
      .content button {
        border: 1px dotted #FEFEFE;
      }
      .hidden {
        display: none;
      }
    `
  }

  /**
   * The component properties.
   *
   * @readonly
   * @static
   * @memberof MyDropdown
   */
  static get properties () {
    return {
      // The dropdown title. (title is reserved, thereby the name).
      titlex: { type: String },
      // The titles of the dropdown's content.
      content: { type: Array }
    }
  }

  /**
   * Handles showing and hiding the dropdown's content.
   *
   * @param {Event} event A click event.
   * @memberof MyDropdown
   */
  onTitleClick (event) {
    event.target.nextElementSibling.classList.toggle('hidden')
  }

  /**
   * Notifies other components of menu actions.
   *
   * @param {Event} event A click event
   * @memberof MyDropdown
   */
  onMenuClick (event) {
    if (!event.target.value) return

    const menuActionEvent = new window.CustomEvent('menu-action', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(menuActionEvent)
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MyDropdown
   */
  render () {
    return html`
      <button @click=${this.onTitleClick}>${this.titlex}</button>
      
      <div class="content hidden" @click=${this.onMenuClick}>
        ${this.content.map(i => html`<button value="${i.toLowerCase()}">${i}</button>`)}
      </div>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-dropdown', MyDropdown)
