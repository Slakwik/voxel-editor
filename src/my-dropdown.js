import { LitElement, html, css } from 'lit-element'

class MyDropdown extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      button {
        background-color: #039372;
        color: white;
        padding: 4px 10px;
        margin: 0 5px 0 3px;
        border: none;
        border-radius: 3px;
        display: inline;
      }
      .content {
        display: none;
      }
      .content button {
        background-color: #04c89a;
      }
      .hidden {
        display: inline;
      }
    `
  }

  static get properties () {
    return {
      title: { type: String },
      content: { type: Array }
    }
  }

  onTitleClick (event) {
    event.target.nextElementSibling.classList.toggle('hidden')
  }

  onMenuClick (event) {
    if (!event.target.value) return

    const menuActionEvent = new window.CustomEvent('menu-action', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(menuActionEvent)
  }

  render () {
    return html`
      <button @click=${this.onTitleClick}>${this.title}</button>
      <div class="content" @click=${this.onMenuClick}>
        ${this.content.map(i => html`<button value="${i.toLowerCase()}">${i}</button>`)}
      </div>
    `
  }
}

window.customElements.define('my-dropdown', MyDropdown)
