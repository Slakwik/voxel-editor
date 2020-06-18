const html = document.createElement('template');
html.innerHTML = `
  <button></button>
`;

const css = document.createElement('template');
css.innerHTML = `
  <style>
    :host {
      display: inline;
    }
    button {
      padding: 12px;
      border: 1px solid white;
      border-radius: 4px;
      margin: 4px 2px;
      cursor: pointer;
      outline: none;
    }
    .selected {
      border: 2px solid #fefefe;
      margin: 2px 1px;
    }
  </style>
`;

class PaletteButton extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));
  }

  connectedCallback() {
    let button = this.shadowRoot.querySelector('button');
    button.style.backgroundColor = this.color;
    button.value = this.color;

    // Notify other components of changes in selected color.
    button.addEventListener('click', (event) => {
      const colorChangeEvent = new window.CustomEvent('color-change', {
        detail: { message: event.target.value },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(colorChangeEvent);
    });

    // Highlight the selected palette button.
    button.addEventListener('focus', (event) => {
      event.target.classList.add('selected');
    });

    // Remove highlight from palette button when unselected.
    button.addEventListener('blur', (event) => {
      event.target.classList.remove('selected');
    });
  }
}

window.customElements.define('my-palette-button', PaletteButton);
