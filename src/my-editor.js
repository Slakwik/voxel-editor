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
    this.scene.add(grid)
    grid.position.y = -5

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    this.scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000)
    pointLight.position.set(150, 150, 150)
    this.scene.add(pointLight)

    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000)
    this.camera.position.z = 50
    this.camera.position.y = 10

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
    sky.scale.setScalar(1000)
    sky.material.uniforms['turbidity'].value = 10
    sky.material.uniforms['rayleigh'].value = 0.5
    sky.material.uniforms['luminance'].value = 0.7
    sky.material.uniforms['mieCoefficient'].value = 0.006
    sky.material.uniforms['mieDirectionalG'].value = 0.85
    sky.material.uniforms['sunPosition'].value = new THREE.Vector3(1, 1, 1)
    sky.name = 'Sky: ' + sky.id
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
    const yellowMaterial = new THREE.MeshPhongMaterial({ color: this.color })

    const cube = new THREE.Mesh(boxGeometry, yellowMaterial)
    cube.position.set(position.x, position.y, position.z)
    cube.name = 'Cube: ' + cube.id

    this.scene.add(cube)
  }

  removeCube (name) {
    if (name.slice(0, 4) !== 'Cube') {
      return
    }
    const cube = this.scene.getObjectByName(name)
    this.scene.remove(cube)
  }

  onClick (event) {
    const firstIntersection = this.getFirstRaycastIntersection()

    if (this.mode === 'build-mode') {
      const clickedObjectPosition = new THREE.Vector3(
        firstIntersection.object.position.x,
        firstIntersection.object.position.y,
        firstIntersection.object.position.z
      )

      const placementDirection = firstIntersection.face.normal

      const placementOffset = placementDirection.multiplyScalar(10)

      const placementPosition = clickedObjectPosition.add(placementOffset)

      this.addCube(placementPosition)
    } else if (this.mode === 'color-mode') {
      firstIntersection.object.material.color.set(this.color)
    }
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
    const name = this.getFirstRaycastIntersection().object.name
    this.removeCube(name)
  }

  animate () {
    window.requestAnimationFrame(this.animate.bind(this))
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return html`
      <div @mousemove=${this.onMouseMove} @click=${this.onClick} @contextmenu=${this.onRightClick}>
        ${this.renderer.domElement}
      </div>
    `
  }
}

window.customElements.define('my-editor', MyEditor)
