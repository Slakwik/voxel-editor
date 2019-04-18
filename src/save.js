const THREE = window.THREE

function save (scene) {
  const exporter = new THREE.GLTFExporter()
  const options = { }

  exporter.parse(scene, (gltfScene) => {
    const jsonScene = JSON.stringify(gltfScene)
    window.localStorage.setItem('scene', jsonScene)
  }, options)
}

export default save
