import './palette-button.js';

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

class PaletteMenu extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));

    // Set default saturation and lightness.
    this.saturation = 90;
    this.lightness = 60;

    // Initialize the palette buttons
    this.refreshPalette();
  }

  connectedCallback() {
    // Handles decreasing the saturation of the palette buttons.
    this.shadowRoot
      .getElementById('decrease-saturation')
      .addEventListener('click', event => {
        if (this.saturation > 0) {
          this.saturation -= 10;
          this.refreshPalette();
        }
      });

    // Handles increasing the saturation of the palette buttons.
    this.shadowRoot
      .getElementById('increase-saturation')
      .addEventListener('click', event => {
        if (this.saturation < 100) {
          this.saturation += 10;
          this.refreshPalette();
        }
      });

    // Handles decreasing the lightness of the palette buttons.
    this.shadowRoot
      .getElementById('decrease-lightness')
      .addEventListener('click', event => {
        if (this.lightness > 0) {
          this.lightness -= 10;
          this.refreshPalette();
        }
      });

    // Handles increasing the lightness of the palette buttons.
    this.shadowRoot
      .getElementById('increase-lightness')
      .addEventListener('click', event => {
        if (this.lightness < 100) {
          this.lightness += 10;
          this.refreshPalette();
        }
      });
  }

  // Refreshes the palette to display new colors.
  refreshPalette() {
    // Remove old palette buttons.
    this.shadowRoot.querySelectorAll('my-palette-button').forEach(button => {
      button.remove();
    });

    // Create and add new palette buttons.
    this.createHSLColorArray(10, this.saturation, this.lightness).forEach(
      color => {
        let button = document.createElement('my-palette-button');
        button.color = color;
        this.shadowRoot.prepend(button);
      }
    );
  }

  // Creates an array of HSL colors by looping around the color wheel.
  createHSLColorArray(hueStep, saturation, lightness) {
    const colors = [];

    for (let hue = 0; hue < 360; hue += hueStep) {
      const color = this.formatHSLColor(hue, saturation, lightness);
      colors.push(color);
    }
    return colors;
  }

  formatHSLColor(hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}

window.customElements.define('my-palette-menu', PaletteMenu);
