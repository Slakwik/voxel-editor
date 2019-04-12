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
      button {     
        border: none;
        padding: 10px;
        border-radius: 2px;
        margin: 4px 4px;
        font-size: 8px;
      }
    `
  }

  constructor () {
    super()

    this.colors = []

    // Create rainbow with HSL colors
    for (let i = 0; i < 360; i += 30) {
      const hue = i
      const saturation = 90
      const lightness = 60

      this.colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    }

    console.log(this.colors)
  }

  onColorClick (event) {
    const colorChangeEvent = new window.CustomEvent('color-change', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(colorChangeEvent)
  }

  render () {
    return html`<div>${this.colors.map(i => html`<button value='${i}' @click="${this.onColorClick}" style='background-color:${i};'></button>`)}</div>`
  }
}

window.customElements.define('my-palette', Palette)
