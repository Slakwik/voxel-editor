import { LitElement, html, css } from 'lit-element'

class MyDropdown extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      div {
        background-color: cyan;
      }
    `
  }

  static get properties () {
    return {
      title: { type: String },
      content: { type: Array }
    }
  }

  render () {
    return html`
      <div>${this.title}</div>
      <div>
        ${this.content.map(i => html`<button>${i}</button>`)}
      </div>
    `
  }
}

window.customElements.define('my-dropdown', MyDropdown)
