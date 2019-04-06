import { LitElement, html, css } from 'lit-element'
import * as THREE from 'three'

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

    this.scene = new THREE.Scene()

    const geometry1 = new THREE.PlaneBufferGeometry(4, 4, 16)
    const material1 = new THREE.MeshBasicMaterial({ color: 0xE59866 })
    const plane = new THREE.Mesh(geometry1, material1)
    this.scene.add(plane)

    const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)

    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000)

    this.camera.position.z = 4
    this.camera.position.y = 1

    this.renderer = new THREE.WebGLRenderer()

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
