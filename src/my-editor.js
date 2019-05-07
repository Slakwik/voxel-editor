import { LitElement, html, css } from 'lit-element'
import save from './save.js'
import load from './load.js'
import exportScene from './export.js'
import takePhoto from './photo.js'

const THREE = window.THREE

class MyEditor extends LitElement {
  static get styles () {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
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
      color: { type: String },
      action: { type: String, reflect: true }
    }
  }

  constructor () {
    super()

    this.scene = new THREE.Scene()

    const grid = new THREE.GridHelper(250, 25)
    grid.material = new THREE.MeshBasicMaterial({ color: 0x888888 })
    grid.name = 'Grid: ' + grid.id
    grid.position.set(0, -5, 0)
    this.scene.add(grid)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    this.scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000, 2)
    pointLight.position.set(150, 150, 150)
    this.scene.add(pointLight)

    const aspectRatio = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
    this.camera.position.set(0, 10, 50)

    this.renderer = new THREE.WebGLRenderer(({ preserveDrawingBuffer: true, antialias: true }))
    this.renderer.setSize(window.innerWidth, window.innerHeight)

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
    sky.material.uniforms.luminance.value = 0.16
    sky.material.uniforms.mieCoefficient.value = 0.01
    sky.material.uniforms.mieDirectionalG.value = 0.95
    sky.material.uniforms.sunPosition.value = new THREE.Vector3(100, 200, 100)
    sky.scale.setScalar(2000)
    this.scene.add(sky)

    this.mouse = new THREE.Vector2()

    this.raycaster = new THREE.Raycaster()

    window.addEventListener('resize', this.onResize.bind(this))

    this.animate()
  }

  firstUpdated () {
    this.addCube(new THREE.Vector3(0, 0, 0))
  }

  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onMouseMove (event) {
    const rendererWidth = window.innerWidth
    const rendererHeight = window.innerHeight

    const mouseX = event.clientX
    const mouseY = event.clientY

    const mouseNormalizedX = mouseX / rendererWidth * 2 - 1
    const mouseNormalizedY = mouseY / rendererHeight * -2 + 1

    this.mouse.x = mouseNormalizedX
    this.mouse.y = mouseNormalizedY
  }

  addCube (position) {
    const boxGeometry = new THREE.BoxBufferGeometry(10, 10, 10)
    const coloredMaterial = new THREE.MeshStandardMaterial({ color: this.color })

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

  onMouseDown (event) {
    this.mouseDownX = event.clientX
    this.mouseDownY = event.clientY
  }

  onMouseUp (event) {
    const mouseUpX = event.clientX
    const mouseUpY = event.clientY

    const eventCoordinateDifferenceX = Math.abs(this.mouseDownX - mouseUpX)
    const eventCoordinateDifferenceY = Math.abs(this.mouseDownY - mouseUpY)

    const movementThreshold = 6

    if (eventCoordinateDifferenceX > movementThreshold ||
      eventCoordinateDifferenceY > movementThreshold) {
      return
    }

    switch (event.button) {
      case 0:
        this.onLeftClick()
        break
      case 2:
        this.onRightClick()
        break
    }
  }

  onLeftClick () {
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

  onRightClick () {
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

  async startLoad () {
    const loadedScene = await load()

    const oldCubes = this.scene.children.filter(child => this.isCube(child))

    this.scene.remove(...oldCubes)

    const newCubes = loadedScene.children.filter(child => this.isCube(child))

    this.scene.add(...newCubes)
  }

  moveCameraTo (x, y, z) {
    this.controls.reset()
    this.camera.position.set(x, y, z)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'action') {
      switch (newValue) {
        case 'save':
          save(this.scene)
          break
        case 'load':
          this.startLoad()
          break
        case 'export':
          let cubes = this.scene.children.filter(child => this.isCube(child))
          let geometries = []
          let materials = []

          for (let i = 0; i < cubes.length; i++) {
            geometries.push(cubes[i].geometry.clone().applyMatrix(cubes[i].matrix))
            materials.push(cubes[i].material.clone())
          }

          let mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geometries, true)
          let mergedMesh = new THREE.Mesh(mergedGeometry, materials)

          exportScene(mergedMesh)
          break
        case 'photo':
          takePhoto(this.renderer)
          break
        case 'top':
          this.moveCameraTo(0, 100, 0)
          break
        case 'right':
          this.moveCameraTo(100, 0, 0)
          break
        case 'bottom':
          this.moveCameraTo(0, -100, 0)
          break
        case 'left':
          this.moveCameraTo(-100, 0, 0)
          break
      }
    }
  }

  render () {
    return html`
      <div @mousemove=${this.onMouseMove} @mousedown=${this.onMouseDown} @mouseup=${this.onMouseUp}>
        ${this.renderer.domElement}
      </div>
    `
  }
}

window.customElements.define('my-editor', MyEditor)
