/**
 * Module for the appbar component.
 *
 * @module src/my-appbar
 * @author Elias Pekkala
 * @version 1.0.0
 */

// Imports.
import { LitElement, html, css } from 'lit-element'
import './my-dropdown'

/**
 * The appbar component.
 *
 * @class MyAppBar
 * @extends {LitElement}
 */
class MyAppBar extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   * @memberof MyAppBar
   */
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        width: 100%;
        height: fit-content;
        background: linear-gradient(to right, #1488CC, #2B32B2);
        border-bottom: 1px solid #FEFEFE;
        -moz-user-select: none;
        user-select: none;
        z-index: 2;
      }
      h2 {
        color: #FEFEFE;
        display: inline;
        vertical-align: middle;
        margin: 0 6px;
      }
    `
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MyAppBar
   */
  render () {
    return html`
      <h2>Voxel Editor</h2>
      
      <my-dropdown titlex="File" .content="${['Save', 'Load', 'Export', 'Screenshot']}"></my-dropdown>
      
      <my-dropdown titlex="Edit" .content="${['Settings']}"></my-dropdown>
      
      <my-dropdown titlex="View" .content="${['Top', 'Right', 'Bottom', 'Left']}"></my-dropdown>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-appbar', MyAppBar)
