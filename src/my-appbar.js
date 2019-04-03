import { LitElement, html, css } from 'lit-element'
import './my-element'

class MyAppBar extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 40px;
        background-color: lightskyblue;
      }
    `
  }

  render () {
    return html`
      <h2>Voxel editor</h2>
    `
  }
}

window.customElements.define('my-appbar', MyAppBar)
