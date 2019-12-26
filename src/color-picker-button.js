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

class ColorPickerButton extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));
  }

  connectedCallback() {
    let button = this.shadowRoot.querySelector('button');

    button.value = this.color;
    button.style.backgroundColor = this.color;

    button.addEventListener('click', event => {
      this.onClick(event);
    });
  }

  // Notifies other components of color changes.
  onClick(event) {
    const colorChangeEvent = new window.CustomEvent('color-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(colorChangeEvent);
  }
}

window.customElements.define('my-color-picker-button', ColorPickerButton);
