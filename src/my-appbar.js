import { LitElement, html, css } from 'lit-element'
import './my-dropdown'

class MyAppBar extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        width: 100%;
        height: fit-content;
        background: linear-gradient(to right, #1488CC, #2B32B2);
        border-bottom: 1px solid #FEFEFE;
        user-select: none;
        z-index: 2;
      }
      h2 {
        color: #FEFEFE;
        display: inline;
        vertical-align: middle;
        margin: 0 6px;
      }
    `
  }

  render () {
    return html`
      <h2>Voxel Editor</h2>
      
      <my-dropdown titlex="File" .content="${['Save', 'Load', 'Export', 'Screenshot']}"></my-dropdown>
      
      <my-dropdown titlex="Edit" .content="${['Undo', 'Redo', 'Settings']}"></my-dropdown>
      
      <my-dropdown titlex="View" .content="${['Top', 'Right', 'Bottom', 'Left']}"></my-dropdown>
    `
  }
}

window.customElements.define('my-appbar', MyAppBar)
