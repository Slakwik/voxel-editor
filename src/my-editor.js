import { LitElement, html, css } from 'lit-element'

const THREE = window.THREE

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

    const grid = new THREE.GridHelper(25, 25, 0x444444, 0x888888)
    this.scene.add(grid)
    grid.position.y = -0.5

    const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    const cube = new THREE.Mesh(boxGeometry, whiteMaterial)
    this.scene.add(cube)

    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000)

    this.camera.position.z = 5
    this.camera.position.y = 1

    this.renderer = new THREE.WebGLRenderer()

    this.renderer.setSize(1600, 900)

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableKeys = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.3
    this.controls.maxDistance = 60
    this.controls.minDistance = 3
    this.controls.rotateSpeed = 0.3
    this.controls.panSpeed = 0.3
    this.controls.zoomSpeed = 1.6

    this.animate()
  }

  animate () {
    window.requestAnimationFrame(this.animate.bind(this))
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return html`
      <div>${this.renderer.domElement}</div>
    `
  }
}

window.customElements.define('my-editor', MyEditor)
