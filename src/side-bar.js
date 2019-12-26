const html = document.createElement('template');
html.innerHTML = `
  <button title="Build" value="build-mode">B</button>
  <button title="Move" value="move-mode">M</button>
  <button title="Color" value="color-mode">C</button>
  <my-color-picker></my-color-picker>
`;

const css = document.createElement('template');
css.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      width: 110px;
      height: fit-content;
      max-height: 100%;
      -moz-user-select: none;
      user-select: none;
      top: 40%;
      left: 5px;
      transform: translateY(-40%);
      z-index: 1;
    }
    button {
      width: 48px;
      height: 48px;
      font-size: 24px;
      font-weight: bold;
      color: white;
      background: linear-gradient(to bottom, #ffe259, #ffa751);
      border: 1px solid #fefefe;
      padding: 0px;
      margin: 2px;
      border-radius: 100%;
      outline: none;
      -moz-user-select: none;
    }
    button:first-child {
      display: block;
      margin: 0px auto;
    }
    .selected {
      border: 2px solid #fefefe;
    }
  </style>
`;

class SideBar extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));
  }

  connectedCallback() {
    let modeButtons = this.shadowRoot.querySelectorAll('button');

    modeButtons.forEach(button => {
      button.addEventListener('focus', event => {
        this.onFocus(event);
      });
      button.addEventListener('click', event => {
        this.onModeClick(event);
      });
    });
  }

  // Hightlights the selected mode button.
  onFocus(event) {
    this.shadowRoot
      .querySelectorAll('button')
      .forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
  }

  // Notifies other components of mode changes.
  onModeClick(event) {
    const modeChangeEvent = new window.CustomEvent('mode-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(modeChangeEvent);
  }
}

window.customElements.define('my-side-bar', SideBar);
