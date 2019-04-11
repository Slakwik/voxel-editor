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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    this.scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100)
    pointLight.position.set(15, 15, 15)
    this.scene.add(pointLight)

    const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    const yellowMaterial = new THREE.MeshPhongMaterial({ color: 0x937520 })
    const cube = new THREE.Mesh(boxGeometry, yellowMaterial)
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

    const sky = new THREE.Sky()
    sky.scale.setScalar(100)
    sky.material.uniforms['turbidity'].value = 10
    sky.material.uniforms['rayleigh'].value = 0.5
    sky.material.uniforms['luminance'].value = 0.7
    sky.material.uniforms['mieCoefficient'].value = 0.006
    sky.material.uniforms['mieDirectionalG'].value = 0.85
    sky.material.uniforms['sunPosition'].value = new THREE.Vector3(1, 1, 1)
    this.scene.add(sky)

    this.mouse = new THREE.Vector2()
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this))

    this.animate()
  }

  onMouseMove (event) {
    this.rendererOffsetX = parseInt(this.renderer.domElement.getBoundingClientRect().left)
    this.rendererOffsetY = parseInt(this.renderer.domElement.getBoundingClientRect().top)
    this.rendererWidth = this.renderer.domElement.getBoundingClientRect().width
    this.rendererHeight = this.renderer.domElement.getBoundingClientRect().height

    this.mouse.x = ((event.clientX - this.rendererOffsetX) / this.clientWidth) * 2 - 1
    this.mouse.y = ((event.clientY - this.rendererOffsetY) / this.clientHeight) * -2 + 1

    console.log('x: ' + this.mouse.x + '   ' + 'y: ' + this.mouse.y)
    console.log('offX: ' + this.rendererOffsetX + '   ' + 'offY: ' + this.rendererOffsetY)
    console.log('height: ' + this.rendererHeight + '   ' + 'width: ' + this.rendererWidth)
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
