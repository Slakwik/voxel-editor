const THREE = window.THREE

function exportScene (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  const cubes = scene.children.filter(child => child.name.slice(0, 4) === 'Cube')
  const mergedCubes = mergeMeshes(cubes)

  exporter.parse(mergedCubes, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    const blob = new window.Blob([jsonScene], { type: 'text/plain' })
    const fileName = 'scene.gltf'

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = fileName
    a.click()
  }, options)
}

function mergeMeshes (meshes) {
  const geometries = []
  const materials = []

  for (let i = 0; i < meshes.length; i++) {
    geometries.push(meshes[i].geometry.clone().applyMatrix(meshes[i].matrix))
    materials.push(meshes[i].material.clone())
  }

  const mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(geometries, true)
  const mergedMesh = new THREE.Mesh(mergedGeometry, materials)

  return mergedMesh
}

function save (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  const cubes = scene.children.filter(child => child.name.slice(0, 4) === 'Cube')

  exporter.parse(cubes, (gltfScene) => {
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
