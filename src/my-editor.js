import { LitElement, html, css } from 'lit-element'
import { WebGLRenderer, Scene, PerspectiveCamera, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three'

class MyEditor extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 95%;
        background-color: darkgray;
      }
      p {
        margin: 0;
      }
    `
  }

  constructor () {
    super()

    this.scene = new Scene()

    const geometry = new BoxBufferGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0xFFFFFF })
    const cube = new Mesh(geometry, material)
    this.scene.add(cube)

    this.camera = new PerspectiveCamera(75, 16 / 9, 0.1, 1000)

    this.camera.position.z = 3

    this.renderer = new WebGLRenderer()

    this.renderer.setSize(1600, 900)

    this.animate()
  }

  animate () {
    window.requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return html`
      <div>${this.renderer.domElement}</div>
    `
  }
}

window.customElements.define('my-editor', MyEditor)
