/**
 * Module for the editor component.
 *
 * @module src/my-editor
 * @author Elias Pekkala
 */

// Imports.
import { LitElement, html, css } from 'lit-element'
import { saveScene, loadScene, exportScene, screenshot } from './scene.js'
import { loadSettings } from './settings.js'

// Defines an alias for the three.js library.
const THREE = window.THREE

/**
 * The editor component.
 *
 * @class MyEditor
 * @extends {LitElement}
 */
class MyEditor extends LitElement {
  /**
   * The component styles.
   *
   * @readonly
   * @static
   * @memberof MyEditor
   */
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

  /**
   * The component properties.
   *
   * @readonly
   * @static
   * @memberof MyEditor
   */
  static get properties () {
    return {
      // The currently active mode.
      mode: { type: String },
      // The currently active color.
      color: { type: String }
    }
  }

  /**
   * Creates an instance of MyEditor.
   *
   * @memberof MyEditor
   */
  constructor () {
    super()

    // Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xdaeaf1)

    // Grid
    const grid = new THREE.GridHelper(250, 25)
    grid.material = new THREE.MeshBasicMaterial({ color: 0x888888 })
    grid.name = 'Grid: ' + grid.id
    grid.position.set(0, -5, 0)
    this.scene.add(grid)

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    this.scene.add(ambientLight)

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000, 2)
    pointLight.position.set(150, 150, 150)
    this.scene.add(pointLight)

    // Camera
    const fov = 75
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 1000
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(0, 10, 50)

    // Settings
    this.settings = loadSettings()

    // Renderer
    this.renderer = new THREE.WebGLRenderer(({
      preserveDrawingBuffer: true,
      antialias: this.settings.antiAliasing
    }))
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // Editor controls
    this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.orbitControls.enableKeys = false
    this.orbitControls.enableDamping = true
    this.orbitControls.dampingFactor = 0.3
    this.orbitControls.maxDistance = 600
    this.orbitControls.minDistance = 30
    this.orbitControls.rotateSpeed = 0.3
    this.orbitControls.panSpeed = 0.3
    this.orbitControls.zoomSpeed = 1.6

    // Voxel controls
    this.voxelControls = new THREE.TransformControls(this.camera, this.renderer.domElement)
    this.voxelControls.setMode('translate')
    this.voxelControls.setTranslationSnap(10)
    this.voxelControls.size += 0.3
    this.scene.add(this.voxelControls)

    // Disable editor controls when voxel controls are being used.
    this.voxelControls.addEventListener('dragging-changed', (event) => {
      this.orbitControls.enabled = !event.value
    })

    // Sky background
    if (this.settings.skyBackground) {
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
    }

    // Mouse & raycaster
    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()

    // Starts the animate loop.
    this.animate()
  }

  /**
   * Gets called when the component updates for the first time.
   *
   * @memberof MyEditor
   */
  firstUpdated () {
    // Adds the starter voxel.
    this.addVoxel(new THREE.Vector3(0, 0, 0))

    // Handles window resizing.
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })

    // Handles menu actions.
    window.addEventListener('menu-action', (event) => {
      this.performAction(event.detail.message)
    })
  }

  /**
   * Calculates and sets the normalized mouse coordinates
   * every time the mouse moves.
   *
   * @param {Event} event A mouse move event.
   * @memberof MyEditor
   */
  onMouseMove (event) {
    const rendererWidth = window.innerWidth
    const rendererHeight = window.innerHeight

    const mouseX = event.clientX
    const mouseY = event.clientY

    // Normalize coordinates so they are between -1 and +1.
    const mouseNormalizedX = mouseX / rendererWidth * 2 - 1
    const mouseNormalizedY = mouseY / rendererHeight * -2 + 1

    this.mouse.x = mouseNormalizedX
    this.mouse.y = mouseNormalizedY
  }

  /**
   * Adds a voxel to the specified position in the scene.
   *
   * @param {THREE.Vector3} position The position to add the voxel.
   * @memberof MyEditor
   */
  addVoxel (position) {
    const boxGeometry = new THREE.BoxBufferGeometry(10, 10, 10)

    // Choose material type based on user settings.
    let coloredMaterial = (this.settings.pbrMaterials)
      ? new THREE.MeshStandardMaterial({ color: this.color })
      : new THREE.MeshBasicMaterial({ color: this.color })

    const voxel = new THREE.Mesh(boxGeometry, coloredMaterial)
    voxel.name = 'Voxel: ' + voxel.id
    voxel.position.set(position.x, position.y, position.z)

    this.scene.add(voxel)
  }

  /**
   * Removes the specified voxel from the scene.
   *
   * @param {THREE.Object3D} voxelReference The voxel to remove.
   * @memberof MyEditor
   */
  removeVoxel (voxelReference) {
    this.scene.remove(voxelReference)
  }

  /**
   * Changes the color of the specified voxel.
   *
   * @param {THREE.Object3D} voxelReference The voxel to color.
   * @memberof MyEditor
   */
  colorVoxel (voxelReference) {
    voxelReference.material.color.set(this.color)
  }

  /**
   * Checks if the specified object is a voxel.
   *
   * @param {THREE.Object3D} object The object to check.
   * @returns True or false.
   * @memberof MyEditor
   */
  isVoxel (object) {
    return object.name.slice(0, 5) === 'Voxel'
  }

  /**
   * Records the coordinates of where the mouse was pressed down.
   *
   * @param {Event} event A mouse down event.
   * @memberof MyEditor
   */
  onMouseDown (event) {
    this.mouseDownX = event.clientX
    this.mouseDownY = event.clientY
  }

  /**
   * Handles mouse up events.
   *
   * @param {Event} event A mouse up event.
   * @memberof MyEditor
   */
  onMouseUp (event) {
    const mouseUpX = event.clientX
    const mouseUpY = event.clientY

    const mousePressedMovementX = Math.abs(this.mouseDownX - mouseUpX)
    const mousePressedMovementY = Math.abs(this.mouseDownY - mouseUpY)

    // The allowed mouse movement in pixels while the mouse is pressed down.
    const movementThreshold = 6

    // Cancels the event if the mouse has travelled to far while pressed down.
    if (mousePressedMovementX > movementThreshold ||
      mousePressedMovementY > movementThreshold) {
      return
    }

    // Redirects the event depending on the mouse button.
    switch (event.button) {
      case 0:
        this.onLeftClick()
        break
      case 2:
        this.onRightClick()
        break
    }
  }

  /**
   * Handles left mouse button clicks.
   *
   * @memberof MyEditor
   */
  onLeftClick () {
    // The object in 3D space that was clicked.
    const firstIntersection = this.getFirstRaycastIntersection()

    // Cancels the selection and detaches the voxel controls
    // when something other than a voxel is clicked (sky, grid).
    if (!this.isVoxel(firstIntersection.object)) {
      this.cancelSelection()
      this.voxelControls.detach(this.selection)
      return
    }

    // Chooses action based on what mode is currently active.
    switch (this.mode) {
      case 'build-mode':
        const placementPosition = this.calculatePlacementPosition(firstIntersection)
        this.addVoxel(placementPosition)
        break

      case 'color-mode':
        this.colorVoxel(firstIntersection.object)
        break

      case 'move-mode':
        // Creates a selection if there isn't one already.
        if (!this.selection) {
          this.selection = new THREE.Group()
          this.selection.position.setFromMatrixPosition(firstIntersection.object.matrixWorld)
          this.scene.add(this.selection)
        }
        this.addToSelection(firstIntersection.object)
        this.voxelControls.attach(this.selection)
        break
    }
  }

  /**
   * Adds a voxel to the selection.
   *
   * @param {THREE.Object3D} voxel The voxel to add.
   * @memberof MyEditor
   */
  addToSelection (voxel) {
    this.attachOutline(voxel)
    this.selection.add(voxel)

    // Adjusts for the switch from world coordinates to local coordinates.
    voxel.position.sub(this.selection.position)
    voxel.updateMatrix()
  }

  /**
   * Removes a voxel from the selection.
   *
   * @param {THREE.Object3D} voxel The voxel to remove.
   * @memberof MyEditor
   */
  removeFromSelection (voxel) {
    this.detachOutline(voxel)
    voxel.position.setFromMatrixPosition(voxel.matrixWorld)
    this.scene.add(voxel)
  }

  /**
   * Attaches an outline to an object.
   *
   * @param {THREE.Object3D} object The object to attach on.
   * @memberof MyEditor
   */
  attachOutline (object) {
    const outline = new THREE.BoxHelper(object, 0xFFFFFF)
    outline.name = 'Outline: ' + outline.id
    object.add(outline)

    // Adjusts for the switch from world coordinates to local coordinates.
    outline.position.sub(object.position)
    outline.updateMatrix()
  }

  /**
   * Detaches the outline from the specified object.
   *
   * @param {THREE.Object3D} object The object to detach from.
   * @memberof MyEditor
   */
  detachOutline (object) {
    const outline = object.children.find(child => child.name.slice(0, 7) === 'Outline')
    object.remove(outline)
  }

  /**
   * Cancels the selection.
   *
   * @memberof MyEditor
   */
  cancelSelection () {
    if (this.selection) {
      // Empties all the selection's children.
      while (this.selection.children.length > 0) {
        this.removeFromSelection(this.selection.children[0])
      }
      this.scene.remove(this.selection)
      this.selection = undefined
    }
  }

  /**
   * Calculates the placement position of the new voxel
   * based on which voxel - and which of its sides - was clicked.
   *
   * @param {Object} intersection The intersection object.
   * @returns An Vector3 with the placement postition.
   * @memberof MyEditor
   */
  calculatePlacementPosition (intersection) {
    const clickedVoxelPosition = new THREE.Vector3(
      intersection.object.position.x,
      intersection.object.position.y,
      intersection.object.position.z
    )

    const placementDirection = intersection.face.normal
    const placementOffset = placementDirection.multiplyScalar(10)
    const placementPosition = clickedVoxelPosition.add(placementOffset)

    return placementPosition
  }

  /**
   * Gets the first object that intersects the raycaster ray.
   *
   * @returns The first intersecting object.
   * @memberof MyEditor
   */
  getFirstRaycastIntersection () {
    this.raycaster.setFromCamera(this.mouse, this.camera)

    const intersections = this.raycaster.intersectObjects(this.scene.children)

    if (intersections.length > 0) return intersections[0]
  }

  /**
   * Handles right mouse button clicks.
   *
   * @memberof MyEditor
   */
  onRightClick () {
    const clickedObject = this.getFirstRaycastIntersection().object

    if (this.isVoxel(clickedObject)) {
      this.removeVoxel(clickedObject)
    }
  }

  /**
   * The animate loop calls itself about 60 times a second
   * and updates controls and rendering.
   *
   * @memberof MyEditor
   */
  animate () {
    this.orbitControls.update()

    this.renderer.render(this.scene, this.camera)

    // Requests a call of the animate method before the next browser repaint.
    window.requestAnimationFrame(this.animate.bind(this))
  }

  /**
   * Moves the camera to the specified coordinates.
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordinate.
   * @param {Number} z The z coordinate.
   * @memberof MyEditor
   */
  moveCameraTo (x, y, z) {
    this.orbitControls.reset()
    this.camera.position.set(x, y, z)
  }

  /**
   * Performs the specified action.
   *
   * @param {string} actionType The action perform.
   * @memberof MyEditor
   */
  performAction (actionType) {
    switch (actionType) {
      case 'save':
        saveScene(this.scene)
        break
      case 'load':
        loadScene(this.scene)
        break
      case 'export':
        exportScene(this.scene)
        break
      case 'screenshot':
        screenshot(this.renderer)
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

  /**
   * Renders a template inside the components shadow root.
   *
   * @returns {TemplateResult} The template to render.
   * @memberof MyEditor
   */
  render () {
    return html`
      <div @mousemove=${this.onMouseMove} @mousedown=${this.onMouseDown} @mouseup=${this.onMouseUp}>
        ${this.renderer.domElement}
      </div>
    `
  }
}

// Registers the custom element with the browser.
window.customElements.define('my-editor', MyEditor)
