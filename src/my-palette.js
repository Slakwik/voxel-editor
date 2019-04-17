import { LitElement, html, css } from 'lit-element'
import './my-color-button'

class MyPalette extends LitElement {
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

    this.colors = this.createColorArray(10, 90, 60)
  }

  createColorArray (hueStepLength, saturation, lightness) {
    let colorArray = []

    for (let hue = 0; hue < 360; hue += hueStepLength) {
      const hsl = this.createHSLColor(hue, saturation, lightness)
      colorArray.push(hsl)
    }

    return colorArray
  }

  createHSLColor (hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  render () {
    return html`${this.colors.map(i => html`<my-color-button .color=${i}></my-color-button>`)}`
  }
}

window.customElements.define('my-palette', MyPalette)
