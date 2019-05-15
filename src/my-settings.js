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
      .close {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0px 6px;
        cursor: pointer;
        font-size: 20px;
      }
    `
  }

  onCloseClick () {
    this.remove()
  }

  render () {
    return html`
      <div>Settings</div>
      <div class='close' @click=${this.onCloseClick}>x</div>
    `
  }
}

window.customElements.define('my-settings', MySettings)
