import { LitElement, html, css } from 'lit-element'
import './my-color-button'

class MyPalette extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        border: 1px solid #FEFEFE;
        background-color: rgba(20, 140, 200, 0.2);
        border-radius: 4px;
        padding: 5px;
        width: 100px;
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

  onFocus (event) {
    this.shadowRoot.querySelectorAll('my-color-button')
      .forEach(el => el.shadowRoot.querySelector('button').classList.remove('selected'))
    event.target.shadowRoot.querySelector('button').classList.add('selected')
  }

  render () {
    return html`${this.colors.map(i => html`<my-color-button .color=${i} @focus='${this.onFocus}'></my-color-button>`)}`
  }
}

window.customElements.define('my-palette', MyPalette)
