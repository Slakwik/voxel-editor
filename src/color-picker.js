import './color-picker-button.js';

const html = document.createElement('template');
html.innerHTML = `
  <button id="decrease-saturation" title="- Saturation">-S</button>
  <button id="increase-saturation" title="+ Saturation">+S</button>
  <button id="decrease-lightness" title="- Lightness">-L</button>
  <button id="increase-lightness" title="+ Lightness">+L</button>
`;

const css = document.createElement('template');
css.innerHTML = `
  <style>
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
  </style>
`;

class ColorPicker extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));

    // Sets default saturation and lightness.
    this.saturation = 90;
    this.lightness = 60;

    // Creates an array of colors that is used to generate color buttons.
    this.colors = this.createColorArray(10, this.saturation, this.lightness);
  }

  connectedCallback() {
    this.addColorButtons();

    let decreaseSaturationButton = this.shadowRoot.getElementById(
      'decrease-saturation'
    );
    let increaseSaturationButton = this.shadowRoot.getElementById(
      'increase-saturation'
    );
    let decreaseLightnessButton = this.shadowRoot.getElementById(
      'decrease-lightness'
    );
    let increaseLightnessButton = this.shadowRoot.getElementById(
      'increase-lightness'
    );

    decreaseSaturationButton.addEventListener('click', event => {
      this.decreaseSaturation();
    });
    increaseSaturationButton.addEventListener('click', event => {
      this.increaseSaturation();
    });
    decreaseLightnessButton.addEventListener('click', event => {
      this.decreaseLightness();
    });
    increaseLightnessButton.addEventListener('click', event => {
      this.increaseLightness();
    });
  }

  addColorButtons() {
    this.colors.forEach(color => {
      let colorButton = document.createElement('my-color-picker-button');
      colorButton.color = color;
      colorButton.addEventListener('focus', event => {
        this.onFocus(event);
      });
      this.shadowRoot.prepend(colorButton);
    });
  }

  removeColorButtons() {
    let colorButtons = this.shadowRoot.querySelectorAll(
      'my-color-picker-button'
    );
    colorButtons.forEach(colorButton => {
      colorButton.remove();
    });
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
    this.removeColorButtons();
    this.addColorButtons();
  }
}

window.customElements.define('my-color-picker', ColorPicker);
