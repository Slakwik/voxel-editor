const THREE = window.THREE

function exportScene (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  let cubes = scene.children.filter(child => child.name.slice(0, 4) === 'Cube')
  let geometries = []
  let materials = []

  for (let i = 0; i < cubes.length; i++) {
    geometries.push(cubes[i].geometry.clone().applyMatrix(cubes[i].matrix))
    materials.push(cubes[i].material.clone())
  }

  let mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geometries, true)
  let mergedMesh = new THREE.Mesh(mergedGeometry, materials)

  exporter.parse(mergedMesh, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    const blob = new window.Blob([jsonScene], { type: 'text/plain' })
    const fileName = 'scene.gltf'

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = fileName
    a.click()
  }, options)
}

function save (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = { }

  exporter.parse(scene, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    window.localStorage.setItem('scene', jsonScene)
  }, options)
}

function load (scene) {
  const loader = new THREE.GLTFLoader()

  const jsonScene = window.localStorage.getItem('scene')

  loader.parse(jsonScene, '', (gltf) => {
    const loadedScene = gltf.scene

    const oldCubes = scene.children.filter(child => child.name.slice(0, 4) === 'Cube')
    scene.remove(...oldCubes)

    const newCubes = loadedScene.children.filter(child => child.name.slice(0, 4) === 'Cube')
    scene.add(...newCubes)
  })
}

function screenshot (renderer) {
  const image = renderer.domElement.toDataURL('image/png')
  const fileName = 'screenshot.png'

  const a = document.createElement('a')
  a.href = image
  a.download = fileName
  a.click()
}

export { save, load, exportScene, screenshot }
