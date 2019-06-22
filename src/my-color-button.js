/**
 * Module for the color button component.
 *
 * @module src/my-color-button
 * @author Elias Pekkala
 */

// Imports.
import { LitElement, html, css } from 'lit-element'

/**
 * The color button component.
 *
 * @class MyColorButton
 * @extends {LitElement}
 */
class MyColorButton extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   * @memberof MyColorButton
   */
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      button {     
        padding: 12px;
        border: 1px solid white;
        border-radius: 4px;
        margin: 4px 2px;
        cursor: pointer;
        outline:none;
      }
      .selected {
        border: 2px solid #FEFEFE;
        margin: 2px 1px
      }
    `
  }

  /**
   * The component properties.
   *
   * @readonly
   * @static
   * @memberof MyColorButton
   */
  static get properties () {
    return {
      // The color of the button.
      color: { type: String }
    }
  }

  /**
   * Notifies other components of color changes.
   *
   * @param {Event} event A click event.
   * @memberof MyColorButton
   */
  onClick (event) {
    const colorChangeEvent = new window.CustomEvent('color-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(colorChangeEvent)
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MyColorButton
   */
  render () {
    return html`
      <style>button { background-color: ${this.color}; }</style>
      <button value='${this.color}' @click='${this.onClick}'></button>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-color-button', MyColorButton)
