const THREE = window.THREE

// from export.js
function exportScene (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = {}

  exporter.parse(scene, (gltfScene) => {
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
function takePhoto (renderer) {
  const image = renderer.domElement.toDataURL('image/png')
  const fileName = 'photo.png'

  const a = document.createElement('a')
  a.href = image
  a.download = fileName
  a.click()
}

// exports
export { save, load, exportScene, takePhoto }
