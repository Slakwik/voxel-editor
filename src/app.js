import './top-bar.js';
import './voxel-editor.js';
import './side-bar.js';
import './palette-menu.js';

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
}

window.customElements.define('my-app', App);
