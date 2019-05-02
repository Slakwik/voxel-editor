import { LitElement, html, css } from 'lit-element'

class MyDropdown extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline;
      }
      button {
        background-color: rgba(0,0,0,0);
        border: 1px solid #FEFEFE;
        color: white;
        padding: 4px 10px;
        margin: 5px 3px;
        border-radius: 3px;
        display: inline;
        cursor: pointer;
        outline: none;
      }
      .content {
        display: none;
      }
      .content button {
        border: 1px dotted #FEFEFE;
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
