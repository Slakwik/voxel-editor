import { LitElement, html, css } from 'lit-element'

class MyAppBar extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
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

      <div>
        <select>
          <option>File</option>
          <option>Open</option>
          <option>Save</option>
          <option>Export</option>
        </select>

        <select>
          <option>Edit</option>
          <option>Undo</option>
          <option>Redo</option>
          <option>Settings</option>
        </select>

        <select>
          <option>View</option>
          <option>Top</option>
          <option>Right</option>
          <option>Bottom</option>
          <option>Left</option>
        </select>
      </div>
    `
  }
}

window.customElements.define('my-appbar', MyAppBar)
