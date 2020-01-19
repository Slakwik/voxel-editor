import './top-bar.js';
import './voxel-editor.js';
import './side-bar.js';
import './palette-menu.js';
import './settings-menu.js';

const html = document.createElement('template');
html.innerHTML = `
  <my-top-bar></my-top-bar>
  <my-side-bar></my-side-bar>
  <my-voxel-editor></my-voxel-editor>
`;

class App extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
  }

  connectedCallback() {
    // Opens the settings menu.
    this.addEventListener('menu-action', event => {
      if (event.detail.message === 'settings') {
        // Makes sure only one settings menu is opened.
        if (!this.shadowRoot.querySelector('my-settings-menu')) {
          const settingsMenu = document.createElement('my-settings-menu');
          this.shadowRoot.appendChild(settingsMenu);
        }
      }
    });
  }
}

window.customElements.define('my-app', App);
