import { LitElement, html, css } from 'lit-element';

class AppBarMenu extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline;
      }
      button {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #fefefe;
        color: white;
        padding: 4px 10px;
        margin: 5px 3px;
        border-radius: 3px;
        display: inline;
        cursor: pointer;
        outline: none;
      }
      button:active {
        transform: translateY(1px);
      }
      button::-moz-focus-inner {
        border: none;
      }
      .content {
        display: inline;
      }
      .content button {
        border: 1px dotted #fefefe;
      }
      .hidden {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      // The menu title. (title is reserved, so I added 'x').
      titlex: { type: String },
      // The titles of the menu's content.
      content: { type: Array }
    };
  }

  // Shows / hides the menu's content.
  onTitleClick(event) {
    event.target.nextElementSibling.classList.toggle('hidden');
  }

  // Notifies other components of menu actions.
  onMenuClick(event) {
    if (!event.target.value) return;

    const menuActionEvent = new window.CustomEvent('menu-action', {
      detail: { message: event.target.value },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(menuActionEvent);
  }

  render() {
    return html`
      <button @click=${this.onTitleClick}>${this.titlex}</button>

      <div class="content hidden" @click=${this.onMenuClick}>
        ${this.content.map(
          i =>
            html`
              <button value="${i.toLowerCase()}">${i}</button>
            `
        )}
      </div>
    `;
  }
}

window.customElements.define('my-app-bar-menu', AppBarMenu);
