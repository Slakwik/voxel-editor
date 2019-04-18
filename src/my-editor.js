import { LitElement, html, css } from 'lit-element'
import save from './save.js'
import load from './load.js'

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

  static get properties () {
    return {
      mode: { type: String },
      color: { type: String }
    }
  }

  constructor () {
    super()

    this.scene = new THREE.Scene()

    const grid = new THREE.GridHelper(250, 25, 0x444444, 0x888888)
    grid.name = 'Grid: ' + grid.id
    grid.position.set(0, -5, 0)
    this.scene.add(grid)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    this.scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000)
    pointLight.position.set(150, 150, 150)
    this.scene.add(pointLight)

    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000)
    this.camera.position.set(0, 10, 50)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(1600, 900)

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableKeys = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.3
    this.controls.maxDistance = 600
    this.controls.minDistance = 30
    this.controls.rotateSpeed = 0.3
    this.controls.panSpeed = 0.3
    this.controls.zoomSpeed = 1.6

    const sky = new THREE.Sky()
    sky.name = 'Sky: ' + sky.id
    sky.material.uniforms.turbidity.value = 10
    sky.material.uniforms.rayleigh.value = 0.5
    sky.material.uniforms.luminance.value = 0.7
    sky.material.uniforms.mieCoefficient.value = 0.006
    sky.material.uniforms.mieDirectionalG.value = 0.85
    sky.material.uniforms.sunPosition.value = new THREE.Vector3(1, 1, 1)
    sky.scale.setScalar(1000)
    this.scene.add(sky)

    this.mouse = new THREE.Vector2()

    this.raycaster = new THREE.Raycaster()

    this.animate()
  }

  firstUpdated () {
    this.addCube(new THREE.Vector3(0, 0, 0))
  }

  onMouseMove (event) {
    const rendererOffsetX = 0
    const rendererOffsetY = 50

    const rendererWidth = 1600
    const rendererHeight = 900

    const mouseX = event.clientX - rendererOffsetX
    const mouseY = event.clientY - rendererOffsetY

    const mouseNormalizedX = mouseX / rendererWidth * 2 - 1
    const mouseNormalizedY = mouseY / rendererHeight * -2 + 1

    this.mouse.x = mouseNormalizedX
    this.mouse.y = mouseNormalizedY
  }

  addCube (position) {
    const boxGeometry = new THREE.BoxBufferGeometry(10, 10, 10)
    const coloredMaterial = new THREE.MeshPhongMaterial({ color: this.color })

    const cube = new THREE.Mesh(boxGeometry, coloredMaterial)
    cube.name = 'Cube: ' + cube.id
    cube.position.set(position.x, position.y, position.z)

    this.scene.add(cube)
  }

  removeCube (cubeReference) {
    this.scene.remove(cubeReference)
  }

  colorCube (cubeReference) {
    cubeReference.material.color.set(this.color)
  }

  isCube (object) {
    if (object.name.slice(0, 4) === 'Cube') {
      return true
    } else {
      return false
    }
  }

  onClick (event) {
    const firstIntersection = this.getFirstRaycastIntersection()

    if (!this.isCube(firstIntersection.object)) { return }

    switch (this.mode) {
      case 'build-mode':
        const placementPosition = this.calculatePlacementPosition(firstIntersection)
        this.addCube(placementPosition)
        break

      case 'color-mode':
        this.colorCube(firstIntersection.object)
        break
    }
  }

  calculatePlacementPosition (intersection) {
    const clickedCubePosition = new THREE.Vector3(
      intersection.object.position.x,
      intersection.object.position.y,
      intersection.object.position.z
    )

    const placementDirection = intersection.face.normal
    const placementOffset = placementDirection.multiplyScalar(10)
    const placementPosition = clickedCubePosition.add(placementOffset)

    return placementPosition
  }

  getFirstRaycastIntersection () {
    this.raycaster.setFromCamera(this.mouse, this.camera)

    const intersections = this.raycaster.intersectObjects(this.scene.children)

    if (intersections.length > 0) {
      const firstIntersection = intersections[0]
      return firstIntersection
    }
  }

  onRightClick (event) {
    const clickedObject = this.getFirstRaycastIntersection().object

    if (this.isCube(clickedObject)) {
      this.removeCube(clickedObject)
    }
  }

  animate () {
    this.controls.update()

    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.animate.bind(this))
  }

  onSaveClick () {
    save(this.scene)
  }

  async onLoadClick () {
    const loadedScene = await load()

    if (loadedScene) {
      this.scene = loadedScene
    }
  }

  render () {
    return html`
      <div @mousemove=${this.onMouseMove} @click=${this.onClick} @contextmenu=${this.onRightClick}>
        ${this.renderer.domElement}
      </div>
      <button @click=${this.onSaveClick}>Save</button>
      <button @click=${this.onLoadClick}>Load</button>
    `
  }
}

window.customElements.define('my-editor', MyEditor)
