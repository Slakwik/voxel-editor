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
      <h2>Voxel editor</h2>
    `
  }
}

window.customElements.define('my-appbar', MyAppBar)
