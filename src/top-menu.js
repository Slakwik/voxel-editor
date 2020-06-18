const html = document.createElement('template');
html.innerHTML = `
  <button class="title"></button>
  <div class="content hidden"></div>
`;

const css = document.createElement('template');
css.innerHTML = `
  <style>
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
  </style>
`;

class TopMenu extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));
  }

  connectedCallback() {
    // The menu title.
    this.title = this.getAttribute('data-title');
    // The titles of the menu's content.
    this.content = JSON.parse(this.getAttribute('data-content'));

    let titleElement = this.shadowRoot.querySelector('.title');

    titleElement.textContent = this.title;

    titleElement.addEventListener('click', (event) => {
      this.onTitleClick(event);
    });

    let menuElement = this.shadowRoot.querySelector('.content');

    menuElement.addEventListener('click', (event) => {
      this.onMenuClick(event);
    });

    this.content.forEach((title) => {
      let button = document.createElement('button');
      button.textContent = title;
      button.value = title.toLowerCase();
      menuElement.appendChild(button);
    });
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
      composed: true,
    });

    this.dispatchEvent(menuActionEvent);
  }
}

window.customElements.define('my-top-menu', TopMenu);
