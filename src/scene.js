const THREE = window.THREE

function exportScene (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  const cubes = scene.children.filter(child => child.name.slice(0, 4) === 'Cube')
  const mergedCubes = mergeMeshes(cubes)

  exporter.parse(mergedCubes, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    const modelData = URL.createObjectURL(new window.Blob([jsonScene], { type: 'text/plain' }))
    const modelName = 'scene.gltf'
    download(modelData, modelName)
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

    const newCubes = loadedScene.children
    scene.add(...newCubes)
  })
}

function screenshot (renderer) {
  const imageData = renderer.domElement.toDataURL('image/png')
  const imageName = 'screenshot.png'
  download(imageData, imageName)
}

function download (data, fileName) {
  const a = document.createElement('a')
  a.href = data
  a.download = fileName
  a.click()
}

export { save, load, exportScene, screenshot }
