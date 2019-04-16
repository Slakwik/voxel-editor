import { LitElement, html, css } from 'lit-element'
import './my-color-button'

class Palette extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        border: 2px solid saddlebrown;
        background-color: tan;
        border-radius: 5px;
        padding: 5px;
        width: 100px;
        top: 35%;
      }
    `
  }

  constructor () {
    super()

    this.colors = this.createColorArray()
  }

  createColorArray (stepLength = 10) {
    let colorArray = []

    for (let i = 0; i < 360; i += stepLength) {
      const hue = i
      const saturation = 90
      const lightness = 60
      const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`

      colorArray.push(hsl)
    }

    return colorArray
  }

  render () {
    return html`${this.colors.map(i => html`<my-color-button .color=${i}></my-color-button>`)}`
  }
}

window.customElements.define('my-palette', Palette)
