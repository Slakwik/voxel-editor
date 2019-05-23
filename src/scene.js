/**
 * Module for managing scenes, etc.
 *
 * @module src/scene
 * @author Elias Pekkala
 * @version 1.0.0
 */

// Defines an alias for the three.js library.
const THREE = window.THREE

/**
 * Exports the content of the scene to the computer.
 *
 * @param {THREE.Scene} scene The scene.
 */
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

/**
 * Merges multiple meshes into a single mesh while preserving their individual
 * positions and materials.
 *
 * @param {Array} meshes An array of meshes to merge.
 * @returns The merged mesh.
 */
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

/**
 * Saves a scene's content to local storage in glTF string format.
 *
 * @param {THREE.Scene} scene The scene to save.
 */
function saveScene (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  const voxels = scene.children.filter(child => child.name.slice(0, 5) === 'Voxel')

  exporter.parse(voxels, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    window.localStorage.setItem('scene', jsonScene)
  }, options)
}

/**
 * Loads scene content from local storage and adds it to the specied scene.
 *
 * @param {THREE.Scene} scene The scene to load into.
 */
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

/**
 * Takes a screenshot of the specified renderer.
 *
 * @param {THREE.WebGLRenderer} renderer The renderer to screenshot.
 */
function screenshot (renderer) {
  const imageData = renderer.domElement.toDataURL('image/png')
  const imageName = 'screenshot.png'
  download(imageData, imageName)
}

/**
 * Creates a file with the specified name; containing the specified data
 * and downloads it to the computer.
 *
 * @param {string} data The data to download.
 * @param {string} fileName The name of the file.
 */
function download (data, fileName) {
  const a = document.createElement('a')
  a.href = data
  a.download = fileName
  a.click()
}

// Exports.
export { saveScene, loadScene, exportScene, screenshot }
