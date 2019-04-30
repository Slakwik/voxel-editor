const THREE = window.THREE

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

export default exportScene
