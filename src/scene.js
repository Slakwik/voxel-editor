const THREE = window.THREE

// from export.js
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

// from save.js
function save (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = { }

  exporter.parse(scene, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    window.localStorage.setItem('scene', jsonScene)
  }, options)
}

// from load.js
function load () {
  const loader = new THREE.GLTFLoader()

  const jsonScene = window.localStorage.getItem('scene')

  return new Promise((resolve) => {
    loader.parse(jsonScene, '', (gltf) => {
      resolve(gltf.scene)
    })
  })
}

// from photo.js
function screenshot (renderer) {
  const image = renderer.domElement.toDataURL('image/png')
  const fileName = 'screenshot.png'

  const a = document.createElement('a')
  a.href = image
  a.download = fileName
  a.click()
}

// exports
export { save, load, exportScene, screenshot }
