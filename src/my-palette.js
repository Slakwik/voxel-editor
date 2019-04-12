import { LitElement, html, css } from 'lit-element'

class Palette extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        height: fit-content;
        position: absolute;
        border: 2px solid orange;
        width: 5%;
        top: 35%;
      }
    `
  }

  render () {
    return html`
      <div>
        <button>01</button>
        <button>02</button>
        <button>03</button>
        <button>04</button>
        <button>05</button>
        <button>06</button>
        <button>07</button>
        <button>08</button>
        <button>09</button>
        <button>10</button>
        <button>11</button>
        <button>12</button>
      </div>
    `
  }
}

window.customElements.define('my-palette', Palette)
