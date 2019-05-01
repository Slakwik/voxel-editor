import { LitElement, html, css } from 'lit-element'
import './my-dropdown'

class MyAppBar extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        width: 100%;
        height: 5%;
        background-color: lightskyblue;
      }
      h2 {
        margin: 0;
      }
    `
  }

  render () {
    return html`
      <h2>Voxel Editor</h2>
      
      <my-dropdown title="File" .content="${['Save', 'Load', 'Export', 'Photo']}"></my-dropdown>
      
      <my-dropdown title="Edit" .content="${['Undo', 'Redo', 'Settings']}"></my-dropdown>
      
      <my-dropdown title="View" .content="${['Top', 'Right', 'Bottom', 'Left']}"></my-dropdown>
    `
  }
}

window.customElements.define('my-appbar', MyAppBar)
