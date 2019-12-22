import { LitElement, html, css } from 'lit-element';
import './color-picker-button.js';

class ColorPicker extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: 1px solid #fefefe;
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
    `;
  }

  constructor() {
    super();

    // Sets default saturation and lightness.
    this.saturation = 90;
    this.lightness = 60;

    // Creates an array of colors that is used to generate color buttons.
    this.colors = this.createColorArray(10, this.saturation, this.lightness);
  }

  // Creates an array of HSL colors by looping around the color wheel.
  createColorArray(hueStepLength, saturation, lightness) {
    const colorArray = [];

    for (let hue = 0; hue < 360; hue += hueStepLength) {
      const hsl = this.createHSLColor(hue, saturation, lightness);
      colorArray.push(hsl);
    }

    return colorArray;
  }

  createHSLColor(hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  // Handles selections of colors.
  onFocus(event) {
    this.clearSelection();
    this.addSelection(event.target);
  }

  // Adds a highlight to a specific color button.
  addSelection(colorButton) {
    colorButton.shadowRoot.querySelector('button').classList.add('selected');
  }

  // Removes the highlights of all color picker buttons.
  clearSelection() {
    this.shadowRoot
      .querySelectorAll('my-color-picker-button')
      .forEach(colorButton => {
        colorButton.shadowRoot
          .querySelector('button')
          .classList.remove('selected');
      });
  }

  // Decreases the saturation of the colors in the palette.
  decreaseSaturation() {
    if (this.saturation > 0) {
      this.saturation -= 10;
    }
    this.updatePalette();
  }

  // Increases the saturation of the colors in the palette.
  increaseSaturation() {
    if (this.saturation < 100) {
      this.saturation += 10;
    }
    this.updatePalette();
  }

  // Decreases the lightness of the colors in the palette.
  decreaseLightness() {
    if (this.lightness > 0) {
      this.lightness -= 10;
    }
    this.updatePalette();
  }

  // Increases the lightness of the colors in the palette.
  increaseLightness() {
    if (this.lightness < 100) {
      this.lightness += 10;
    }
    this.updatePalette();
  }

  // Updates the palette component so that new colors are displayed.
  updatePalette() {
    this.colors = this.createColorArray(10, this.saturation, this.lightness);
    super.performUpdate();
  }

  render() {
    return html`
      ${this.colors.map(
        i =>
          html`
            <my-color-picker-button
              .color=${i}
              @focus="${this.onFocus}"
            ></my-color-picker-button>
          `
      )}

      <button title="- Saturation" @click="${this.decreaseSaturation}">
        -S
      </button>
      <button title="+ Saturation" @click="${this.increaseSaturation}">
        +S
      </button>

      <button title="- Lightness" @click="${this.decreaseLightness}">-L</button>
      <button title="+ Lightness" @click="${this.increaseLightness}">+L</button>
    `;
  }
}

window.customElements.define('my-color-picker', ColorPicker);
