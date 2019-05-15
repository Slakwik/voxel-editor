import { LitElement, html, css } from 'lit-element'

class MySettings extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        position: absolute;
        border: 1px solid #FEFEFE;
        background-color: rgba(20, 140, 200, 0.2);
        border-radius: 4px;
        padding: 5px;
        height: 250px;
        width: 200px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      div {
        color: white;
      }
    `
  }

  render () {
    return html`
      <div>Settings</div>
    `
  }
}

window.customElements.define('my-settings', MySettings)
