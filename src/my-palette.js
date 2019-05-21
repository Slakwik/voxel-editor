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
        padding: 2px;
        font-size: 16px;
        border: 1px solid white;
        border-radius: 100%;
        margin: 4px 0px;
        cursor: pointer;
        outline: none;
        background: none;
        color: white;
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
    this.clearSelection()
    this.addSelection(event.target)
  }

  addSelection (colorButton) {
    colorButton.shadowRoot.querySelector('button').classList.add('selected')
  }

  clearSelection () {
    this.shadowRoot.querySelectorAll('my-color-button')
      .forEach(colorButton => {
        colorButton.shadowRoot.querySelector('button').classList.remove('selected')
      })
  }

  decreaseSaturation () {
    if (this.saturation > 0) {
      this.saturation -= 10
    }
    this.updatePalette()
  }

  increaseSaturation () {
    if (this.saturation < 100) {
      this.saturation += 10
    }
    this.updatePalette()
  }

  decreaseLightness () {
    if (this.lightness > 0) {
      this.lightness -= 10
    }
    this.updatePalette()
  }

  increaseLightness () {
    if (this.lightness < 100) {
      this.lightness += 10
    }
    this.updatePalette()
  }

  updatePalette () {
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
