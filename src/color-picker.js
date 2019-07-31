/**
 * Module for the palette component.
 *
 * @module src/my-palette
 * @author Elias Pekkala
 */

// Imports.
import { LitElement, html, css } from 'lit-element'
import './color-picker-button.js'

/**
 * The palette component.
 *
 * @class MyPalette
 * @extends {LitElement}
 */
class MyPalette extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   */
  static get styles () {
    return css`
      :host {
        display: block;
        border: 1px solid #FEFEFE;
        background-color: rgba(20, 140, 200, 0.2);
        border-radius: 4px;
        padding: 5px;
        width: 100px;
      }
      button {
        padding: 2px;
        font-size: 12px;
        height: 22px;
        width: 22px;
        font-weight: bold;
        border: 1px solid white;
        border-radius: 100%;
        margin: 4px 0px;
        cursor: pointer;
        outline: none;
        background: none;
        color: white;
      }
      button::-moz-focus-inner {
        border: none;
      }
      button:active {
        transform: translateY(1px);
      }
    `
  }

  /**
   * Creates an instance of MyPalette.
   */
  constructor () {
    super()

    // Sets the default saturation and lightness.
    this.saturation = 90
    this.lightness = 60

    // Creates an array of colors that is later used to generate color buttons.
    this.colors = this.createColorArray(10, this.saturation, this.lightness)
  }

  /**
   * Creates an array of HSL colors by looping around the color wheel.
   *
   * @param {Number} hueStepLength The step length of the color wheel loop.
   * @param {Number} saturation The color saturation.
   * @param {Number} lightness The color lightness.
   * @returns An array of HSL colors.
   */
  createColorArray (hueStepLength, saturation, lightness) {
    const colorArray = []

    for (let hue = 0; hue < 360; hue += hueStepLength) {
      const hsl = this.createHSLColor(hue, saturation, lightness)
      colorArray.push(hsl)
    }

    return colorArray
  }

  /**
   * Creates / formats a HSL color.
   *
   * @param {Number} hue The color hue.
   * @param {Number} saturation The color saturation.
   * @param {Number} lightness The color lightness.
   * @returns A HSL color string.
   */
  createHSLColor (hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  /**
   * Handles the visual indication of which color is currently selected.
   *
   * @param {Event} event A focus event.
   */
  onFocus (event) {
    this.clearSelection()
    this.addSelection(event.target)
  }

  /**
   * Adds an visual indication to a specific color button.
   *
   * @param {HTMLElement} colorButton
   */
  addSelection (colorButton) {
    colorButton.shadowRoot.querySelector('button').classList.add('selected')
  }

  /**
   * Clears the visual indication of which color button is selected.
   */
  clearSelection () {
    this.shadowRoot.querySelectorAll('my-color-button')
      .forEach(colorButton => {
        colorButton.shadowRoot.querySelector('button').classList.remove('selected')
      })
  }

  /**
   * Decreases the saturation of the colors in the palette.
   */
  decreaseSaturation () {
    if (this.saturation > 0) {
      this.saturation -= 10
    }
    this.updatePalette()
  }

  /**
   * Increases the saturation of the colors in the palette.
   */
  increaseSaturation () {
    if (this.saturation < 100) {
      this.saturation += 10
    }
    this.updatePalette()
  }

  /**
   * Decreases the lightness of the colors in the palette.
   */
  decreaseLightness () {
    if (this.lightness > 0) {
      this.lightness -= 10
    }
    this.updatePalette()
  }

  /**
   * Increases the lightness of the colors in the palette.
   */
  increaseLightness () {
    if (this.lightness < 100) {
      this.lightness += 10
    }
    this.updatePalette()
  }

  /**
   * Updates the palette component so that new colors display.
   */
  updatePalette () {
    this.colors = this.createColorArray(10, this.saturation, this.lightness)
    super.performUpdate()
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   */
  render () {
    return html`
      ${this.colors.map(i => html`<my-color-button .color=${i} @focus='${this.onFocus}'></my-color-button>`)}
      
      <button title="- Saturation" @click="${this.decreaseSaturation}">-S</button>
      <button title="+ Saturation" @click="${this.increaseSaturation}">+S</button>
      
      <button title="- Lightness" @click="${this.decreaseLightness}">-L</button>
      <button title="+ Lightness" @click="${this.increaseLightness}">+L</button>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-palette', MyPalette)
