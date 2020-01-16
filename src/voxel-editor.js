import * as THREE from '../vendor/three/build/three.module.js';
import { Sky } from '../vendor/three/examples/jsm/objects/Sky.js';
import { OrbitControls } from '../vendor/three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from '../vendor/three/examples/jsm/controls/TransformControls.js';

import {
  saveScene,
  loadScene,
  exportScene,
  screenshot
} from './scene-manager.js';
import { loadSettings } from './settings-manager.js';

const html = document.createElement('template');
html.innerHTML = `
  <div></div>
`;

const css = document.createElement('template');
css.innerHTML = `
  <style>
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
  </style>
`;

class VoxelEditor extends window.HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(html.content.cloneNode(true));
    this.shadowRoot.appendChild(css.content.cloneNode(true));

    // Sets default mode and color.
    this.selectedMode = 'build-mode';
    this.selectedColor = 'hsl(60, 90%, 60%)';

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdaeaf1);

    // Grid
    const grid = new THREE.GridHelper(250, 25);
    grid.material = new THREE.MeshBasicMaterial({ color: 0x888888 });
    grid.name = 'Grid: ' + grid.id;
    grid.position.set(0, -5, 0);
    this.scene.add(grid);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    this.scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000, 2);
    pointLight.position.set(150, 150, 150);
    this.scene.add(pointLight);

    // Camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 10, 50);

    // Settings
    this.settings = loadSettings();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: this.settings.antiAliasing
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Editor controls
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.enableKeys = false;
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.3;
    this.orbitControls.maxDistance = 600;
    this.orbitControls.minDistance = 30;
    this.orbitControls.rotateSpeed = 0.3;
    this.orbitControls.panSpeed = 0.3;
    this.orbitControls.zoomSpeed = 1.6;

    // Voxel controls
    this.voxelControls = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    this.voxelControls.setMode('translate');
    this.voxelControls.setTranslationSnap(10);
    this.voxelControls.size += 0.3;
    this.scene.add(this.voxelControls);

    // Disables editor controls when voxel controls are being used.
    this.voxelControls.addEventListener('dragging-changed', event => {
      this.orbitControls.enabled = !event.value;
    });

    // Sky background
    if (this.settings.skyBackground) {
      const sky = new Sky();
      sky.name = 'Sky: ' + sky.id;
      sky.material.uniforms.turbidity.value = 10;
      sky.material.uniforms.rayleigh.value = 0.5;
      sky.material.uniforms.luminance.value = 0.16;
      sky.material.uniforms.mieCoefficient.value = 0.01;
      sky.material.uniforms.mieDirectionalG.value = 0.95;
      sky.material.uniforms.sunPosition.value = new THREE.Vector3(
        100,
        200,
        100
      );
      sky.scale.setScalar(2000);
      this.scene.add(sky);
    }

    // Mouse & raycaster
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    // Starts the animate loop.
    this.animate();
  }

  connectedCallback() {
    let mainDiv = this.shadowRoot.querySelector('div');

    mainDiv.addEventListener('mousemove', event => {
      this.onMouseMove(event);
    });
    mainDiv.addEventListener('mousedown', event => {
      this.onMouseDown(event);
    });
    mainDiv.addEventListener('mouseup', event => {
      this.onMouseUp(event);
    });

    // Add the render element
    mainDiv.appendChild(this.renderer.domElement);

    // Adds the starter voxel.
    this.addVoxel(new THREE.Vector3(0, 0, 0));

    // Handles window resizing.
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Handles menu actions.
    window.addEventListener('menu-action', event => {
      this.performAction(event.detail.message);
    });

    // Handles mode changes.
    window.addEventListener('mode-change', event => {
      this.selectedMode = event.detail.message;
    });

    // Handles color changes.
    window.addEventListener('color-change', event => {
      this.selectedColor = event.detail.message;
    });
  }

  // Calculates and sets the normalized mouse coordinates
  // every time the mouse moves.
  onMouseMove(event) {
    const rendererWidth = window.innerWidth;
    const rendererHeight = window.innerHeight;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Normalize coordinates to be between -1 and +1.
    const mouseNormalizedX = (mouseX / rendererWidth) * 2 - 1;
    const mouseNormalizedY = (mouseY / rendererHeight) * -2 + 1;

    this.mouse.x = mouseNormalizedX;
    this.mouse.y = mouseNormalizedY;
  }

  // Adds a voxel to the specified position.
  addVoxel(position) {
    const boxGeometry = new THREE.BoxBufferGeometry(10, 10, 10);

    // Chooses material type based on user settings.
    let coloredMaterial = this.settings.pbrMaterials
      ? new THREE.MeshStandardMaterial({ color: this.selectedColor })
      : new THREE.MeshBasicMaterial({ color: this.selectedColor });

    const voxel = new THREE.Mesh(boxGeometry, coloredMaterial);
    voxel.name = 'Voxel: ' + voxel.id;
    voxel.position.set(position.x, position.y, position.z);

    this.scene.add(voxel);
  }

  // Removes a voxel from the scene.
  removeVoxel(voxelReference) {
    this.scene.remove(voxelReference);
  }

  // Changes the color of a voxel.
  colorVoxel(voxelReference) {
    voxelReference.material.color.set(this.selectedColor);
  }

  // Checks if the given object is a voxel.
  isVoxel(object) {
    return object.name.slice(0, 5) === 'Voxel';
  }

  // Records the coordinates of where the mouse was pressed.
  onMouseDown(event) {
    this.mouseDownX = event.clientX;
    this.mouseDownY = event.clientY;
  }

  onMouseUp(event) {
    const mouseUpX = event.clientX;
    const mouseUpY = event.clientY;

    const mousePressedMovementX = Math.abs(this.mouseDownX - mouseUpX);
    const mousePressedMovementY = Math.abs(this.mouseDownY - mouseUpY);

    // The allowed mouse movement in pixels while the mouse is pressed.
    const movementThreshold = 6;

    // Cancels the event if the mouse has travelled to far while pressed.
    if (
      mousePressedMovementX > movementThreshold ||
      mousePressedMovementY > movementThreshold
    ) {
      return;
    }

    // Redirects the event depending on the mouse button.
    switch (event.button) {
      case 0:
        this.onLeftClick();
        break;
      case 2:
        this.onRightClick();
        break;
    }
  }

  onLeftClick() {
    // The scene object that was clicked.
    const firstIntersection = this.getFirstRaycastIntersection();

    // Cancels the selection and detaches the voxel controls
    // when something other than a voxel is clicked (sky, grid).
    if (!this.isVoxel(firstIntersection.object)) {
      this.cancelSelection();
      this.voxelControls.detach(this.selection);
      return;
    }

    // Chooses action based on the active mode.
    switch (this.selectedMode) {
      case 'build-mode':
        const placementPosition = this.calculatePlacementPosition(
          firstIntersection
        );
        this.addVoxel(placementPosition);
        break;

      case 'color-mode':
        this.colorVoxel(firstIntersection.object);
        break;

      case 'move-mode':
        // Creates a move selection if there isn't one already.
        if (!this.selection) {
          this.selection = new THREE.Group();
          this.selection.position.setFromMatrixPosition(
            firstIntersection.object.matrixWorld
          );
          this.scene.add(this.selection);
        }
        this.addToSelection(firstIntersection.object);
        this.voxelControls.attach(this.selection);
        break;
    }
  }

  // Adds a voxel to the move selection.
  addToSelection(voxel) {
    this.attachOutline(voxel);
    this.selection.add(voxel);

    // Adjusts for the switch from world coordinates to local coordinates.
    voxel.position.sub(this.selection.position);
    voxel.updateMatrix();
  }

  // Removes a voxel from the move selection.
  removeFromSelection(voxel) {
    this.detachOutline(voxel);
    voxel.position.setFromMatrixPosition(voxel.matrixWorld);
    this.scene.add(voxel);
  }

  // Attaches an outline to an object.
  attachOutline(object) {
    const outline = new THREE.BoxHelper(object, 0xffffff);
    outline.name = 'Outline: ' + outline.id;
    object.add(outline);

    // Adjusts for the switch from world coordinates to local coordinates.
    outline.position.sub(object.position);
    outline.updateMatrix();
  }

  // Detaches the outline from the specified object.
  detachOutline(object) {
    const outline = object.children.find(
      child => child.name.slice(0, 7) === 'Outline'
    );
    object.remove(outline);
  }

  // Cancels the move selection.
  cancelSelection() {
    if (this.selection) {
      // Empties all the selection's children.
      while (this.selection.children.length > 0) {
        this.removeFromSelection(this.selection.children[0]);
      }
      this.scene.remove(this.selection);
      this.selection = undefined;
    }
  }

  // Calculates the placement position of the new voxel
  // based on which voxel - and which of its sides - was clicked.
  calculatePlacementPosition(intersection) {
    const clickedVoxelPosition = new THREE.Vector3(
      intersection.object.position.x,
      intersection.object.position.y,
      intersection.object.position.z
    );

    const placementDirection = intersection.face.normal;
    const placementOffset = placementDirection.multiplyScalar(10);
    const placementPosition = clickedVoxelPosition.add(placementOffset);

    return placementPosition;
  }

  // Returns the first object that intersects the raycaster ray.
  getFirstRaycastIntersection() {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersections = this.raycaster.intersectObjects(this.scene.children);

    if (intersections.length > 0) return intersections[0];
  }

  onRightClick() {
    const clickedObject = this.getFirstRaycastIntersection().object;

    if (this.isVoxel(clickedObject)) {
      this.removeVoxel(clickedObject);
    }
  }

  // The animate loop calls itself 60 times a second
  // and updates controls and rendering.
  animate() {
    this.orbitControls.update();

    this.renderer.render(this.scene, this.camera);

    // Requests a call of the animate method before the next browser repaint.
    window.requestAnimationFrame(this.animate.bind(this));
  }

  // Moves the camera to the specified coordinates.
  moveCameraTo(x, y, z) {
    this.orbitControls.reset();
    this.camera.position.set(x, y, z);
  }

  // Performs the specified menu action.
  performAction(actionType) {
    switch (actionType) {
      case 'save':
        saveScene(this.scene);
        break;
      case 'load':
        loadScene(this.scene);
        break;
      case 'export':
        exportScene(this.scene);
        break;
      case 'screenshot':
        screenshot(this.renderer);
        break;
      case 'top':
        this.moveCameraTo(0, 100, 0);
        break;
      case 'right':
        this.moveCameraTo(100, 0, 0);
        break;
      case 'bottom':
        this.moveCameraTo(0, -100, 0);
        break;
      case 'left':
        this.moveCameraTo(-100, 0, 0);
        break;
    }
  }
}

window.customElements.define('my-voxel-editor', VoxelEditor);
