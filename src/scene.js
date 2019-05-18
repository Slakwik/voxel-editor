const THREE = window.THREE

function exportScene (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  const voxels = scene.children.filter(child => child.name.slice(0, 5) === 'Voxel')
  const mergedVoxels = mergeMeshes(voxels)

  exporter.parse(mergedVoxels, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    const modelData = URL.createObjectURL(new window.Blob([jsonScene], { type: 'text/plain' }))
    const modelName = 'model.gltf'
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

function saveScene (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  const voxels = scene.children.filter(child => child.name.slice(0, 5) === 'Voxel')

  exporter.parse(voxels, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    window.localStorage.setItem('scene', jsonScene)
  }, options)
}

function loadScene (scene) {
  const loader = new THREE.GLTFLoader()

  const jsonScene = window.localStorage.getItem('scene')

  loader.parse(jsonScene, '', (gltf) => {
    const loadedScene = gltf.scene

    const oldVoxels = scene.children.filter(child => child.name.slice(0, 5) === 'Voxel')
    scene.remove(...oldVoxels)

    const newVoxels = loadedScene.children
    scene.add(...newVoxels)
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

export { saveScene, loadScene, exportScene, screenshot }
