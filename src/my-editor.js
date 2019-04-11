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

    const grid = new THREE.GridHelper(250, 25, 0x444444, 0x888888)
    grid.name = 'Grid: ' + grid.id
    this.scene.add(grid)
    grid.position.y = -5

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    this.scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000)
    pointLight.position.set(150, 150, 150)
    this.scene.add(pointLight)

    this.addCube(new THREE.Vector3(0, 0, 0))

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
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.renderer.domElement.addEventListener('click', this.onClick.bind(this))

    this.raycaster = new THREE.Raycaster()

    this.animate()
  }

  onMouseMove (event) {
    const rendererOffsetX = 0
    const rendererOffsetY = 50
    const rendererWidth = 1600
    const rendererHeight = 900

    this.mouse.x = ((event.clientX - rendererOffsetX) / rendererWidth) * 2 - 1
    this.mouse.y = ((event.clientY - rendererOffsetY) / rendererHeight) * -2 + 1
  }

  addCube (position) {
    const boxGeometry = new THREE.BoxBufferGeometry(10, 10, 10)
    const yellowMaterial = new THREE.MeshPhongMaterial({ color: 0x937520 })
    const cube = new THREE.Mesh(boxGeometry, yellowMaterial)
    cube.position.set(position.x, position.y, position.z)
    cube.name = 'Cube: ' + cube.id
    this.scene.add(cube)
  }

  onClick (event) {
    this.raycaster.setFromCamera(this.mouse, this.camera)

    const intersects = this.raycaster.intersectObjects(this.scene.children)

    if (intersects.length > 0) {
      const firstIntersect = intersects[0]
      console.log(firstIntersect.object.name)
      console.log('x: ' + firstIntersect.point.x.toFixed(1) + ' ' +
                  'y: ' + firstIntersect.point.y.toFixed(1) + ' ' +
                  'z: ' + firstIntersect.point.z.toFixed(1))

      let clickPosition = new THREE.Vector3(
        firstIntersect.point.x,
        firstIntersect.point.y,
        firstIntersect.point.z)

      const clickedObjectPosition = new THREE.Vector3(
        firstIntersect.object.position.x,
        firstIntersect.object.position.y,
        firstIntersect.object.position.z
      )

      const placementDirection = firstIntersect.face.normal

      console.log(placementDirection)

      const placementOffset = placementDirection.multiplyScalar(10)

      console.log(placementOffset)

      const placementPosition = clickedObjectPosition.add(placementOffset)

      console.log(placementPosition)

      this.addCube(placementPosition)
    }
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
