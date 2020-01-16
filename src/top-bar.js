import './top-menu.js';

const html = document.createElement('template');
html.innerHTML = `
  <h2>Voxel Editor</h2>

  <my-top-menu
    data-title="File"
    data-content='["Save", "Load", "Export", "Screenshot"]'
  ></my-top-menu>

  <my-top-menu
    data-title="Edit"
    data-content='["Settings"]'
  ></my-top-menu>

  <my-top-menu
    data-title="View"
    data-content='["Top", "Right", "Bottom", "Left"]'
  ></my-top-menu>
`;

const css = document.createElement('template');
css.innerHTML = `
  <style>
    :host {
      display: block;
      position: absolute;
      width: 100%;
      height: fit-content;
      background: linear-gradient(to right, #1488cc, #2b32b2);
      border-bottom: 1px solid #fefefe;
      -moz-user-select: none;
      user-select: none;
      z-index: 2;
    }
    h2 {
      color: #fefefe;
      display: inline;
      vertical-align: middle;
      margin: 0 6px;
    }
  </style>
`;

class TopBar extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));
  }
}

window.customElements.define('my-top-bar', TopBar);
