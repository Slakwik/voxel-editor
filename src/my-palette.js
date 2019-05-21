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
      button {
        padding: 0px;
        font-size: 16px;
        border: 1px solid white;
        border-radius: 100%;
        margin: 4px 2px;
        cursor: pointer;
        outline: none;
      }
    `
  }

  constructor () {
    super()

    this.saturation = 90
    this.lightness = 60

    this.colors = this.createColorArray(10, this.saturation, this.lightness)
  }

  createColorArray (hueStepLength, saturation, lightness) {
    const colorArray = []

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

  decreaseSaturation () {
    if (this.saturation > 0) {
      this.saturation -= 10
    }

    this.colors = this.createColorArray(10, this.saturation, this.lightness)
    super.performUpdate()
  }

  increaseSaturation () {
    if (this.saturation < 100) {
      this.saturation += 10
    }

    this.colors = this.createColorArray(10, this.saturation, this.lightness)
    super.performUpdate()
  }

  decreaseLightness () {
    if (this.lightness > 0) {
      this.lightness -= 10
    }

    this.colors = this.createColorArray(10, this.saturation, this.lightness)
    super.performUpdate()
  }

  increaseLightness () {
    if (this.lightness < 100) {
      this.lightness += 10
    }

    this.colors = this.createColorArray(10, this.saturation, this.lightness)
    super.performUpdate()
  }

  render () {
    return html`
      ${this.colors.map(i => html`<my-color-button .color=${i} @focus='${this.onFocus}'></my-color-button>`)}
      
      <button @click="${this.decreaseSaturation}">▼</button>
      <button @click="${this.increaseSaturation}">▲</button>
      
      <button @click="${this.decreaseLightness}">▼</button>
      <button @click="${this.increaseLightness}">▲</button>
    `
  }
}

window.customElements.define('my-palette', MyPalette)
