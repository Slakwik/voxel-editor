/**
 * Module for the palette component.
 *
 * @module src/my-palette
 * @author Elias Pekkala
 * @version 1.0.0
 */

// Imports.
import { LitElement, html, css } from 'lit-element'
import './my-color-button'

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
   * @memberof MyPalette
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
        font-size: 16px;
        border: 1px solid white;
        border-radius: 100%;
        margin: 4px 0px;
        cursor: pointer;
        outline: none;
        background: none;
        color: white;
      }
    `
  }

  /**
   * Creates an instance of MyPalette.
   *
   * @memberof MyPalette
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
   * @param {Number} hueStepLength The step length for the color wheel loop.
   * @param {Number} saturation The color saturation.
   * @param {Number} lightness The color lightness.
   * @returns An array of HSL colors.
   * @memberof MyPalette
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
   * @memberof MyPalette
   */
  createHSLColor (hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  /**
   * Handles the visual indication of which color is currently selected.
   *
   * @param {Event} event A focus event.
   * @memberof MyPalette
   */
  onFocus (event) {
    this.clearSelection()
    this.addSelection(event.target)
  }

  /**
   * Adds an visual indication to a specific color button.
   *
   * @param {HTMLElement} colorButton
   * @memberof MyPalette
   */
  addSelection (colorButton) {
    colorButton.shadowRoot.querySelector('button').classList.add('selected')
  }

  /**
   * Clears the visual indication of which color button is selected.
   *
   * @memberof MyPalette
   */
  clearSelection () {
    this.shadowRoot.querySelectorAll('my-color-button')
      .forEach(colorButton => {
        colorButton.shadowRoot.querySelector('button').classList.remove('selected')
      })
  }

  /**
   * Decreases the saturation of the colors in the palette.
   *
   * @memberof MyPalette
   */
  decreaseSaturation () {
    if (this.saturation > 0) {
      this.saturation -= 10
    }
    this.updatePalette()
  }

  /**
   * Increases the saturation of the colors in the palette.
   *
   * @memberof MyPalette
   */
  increaseSaturation () {
    if (this.saturation < 100) {
      this.saturation += 10
    }
    this.updatePalette()
  }

  /**
   * Decreases the lightness of the colors in the palette.
   *
   * @memberof MyPalette
   */
  decreaseLightness () {
    if (this.lightness > 0) {
      this.lightness -= 10
    }
    this.updatePalette()
  }

  /**
   * Increases the lightness of the colors in the palette.
   *
   * @memberof MyPalette
   */
  increaseLightness () {
    if (this.lightness < 100) {
      this.lightness += 10
    }
    this.updatePalette()
  }

  /**
   * Updates the palette component so that new colors display.
   *
   * @memberof MyPalette
   */
  updatePalette () {
    this.colors = this.createColorArray(10, this.saturation, this.lightness)
    super.performUpdate()
  }

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MyPalette
   */
  render () {
    return html`
      ${this.colors.map(i => html`<my-color-button .color=${i} @focus='${this.onFocus}'></my-color-button>`)}
      
      <button @click="${this.decreaseSaturation}">▼</button>
      <button @click="${this.increaseSaturation}">▲</button>
      
      <button @click="${this.decreaseLightness}">▼</button>
      <button @click="${this.increaseLightness}">▲</button>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-palette', MyPalette)
