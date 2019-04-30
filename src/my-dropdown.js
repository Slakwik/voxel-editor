import { LitElement, html, css } from 'lit-element'

class MyDropdown extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      div {
        background-color: #039372;
        color: white;
        padding: 4px 10px;
        margin-right: 5px;
        border: none;
        border-radius: 3px;
        display: inline
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
